console.log("/talks/" + encodeURIComponent("How to Idle"));
// → /talks/How%20to%20Idle

const {parse} = require("url");
module.exports = class Router {
    constructor() {
        this.routes = [];
    }
    add(method, url, handler) {
     this.routes.push({method, url, handler});
    }
    resolve(context, request) {
        let path = parse(request.url).pathname;
        for (let {method, url, handler} of this.routes) {
            let match = url.exec(path);
            if (!match || request.method != method) continue;
            let urlParts = match.slice(1).map(decodeURIComponent);
            return handler(context, ...urlParts, request);
        }
        return null;
    }
};

const {createServer} = require("http");
const Router = require("./router");
const ecstatic = require("ecstatic");
const router = new Router();
const defaultHeaders = {"Content-Type": "text/plain"};
class SkillShareServer {
    constructor(talks) {
        this.talks = talks;
        this.version = 0;
        this.waiting = [];
        let fileServer = ecstatic({root: "./public"});
        this.server = createServer((request, response) => {
            let resolved = router.resolve(this, request);
            if (resolved) {
                resolved.catch(error => {
                    if (error.status != null) return error;
                    return {body: String(error), status: 500};
                })
                .then(({body,status = 200,headers = defaultHeaders}) => {
                    response.writeHead(status, headers);
                    response.end(body);
                });
                } else {
                fileServer(request, response);
            }
        });
    }

    start(port) {
        this.server.listen(port);
    }

    stop() {
        this.server.close();
    }
}

//talk as resources
const talkPath = /^\/talks\/([^\/]+)$/;
router.add("GET", talkPath, async (server, title) => {
    if (title in server.talks) {
        return {body: JSON.stringify(server.talks[title]),
        headers: {"Content-Type": "application/json"}};
    } else {
    return {status: 404, body: `No talk '${title}' found`};
    }
});

router.add("DELETE", talkPath, async (server, title) => {
    if (title in server.talks) {
        delete server.talks[title];
        server.updated();
    }
    return {status: 204};
});

SkillShareServer.prototype.talkResponse = function() {
    let talks = [];
    for (let title of Object.keys(this.talks)) {
        talks.push(this.talks[title]);
    }
    return {
        body: JSON.stringify(talks),
        headers: {"Content-Type": "application/json",
        "ETag": `"${this.version}"`}
    };
};

function handleAction(state, action) {
    if (action.type == "setUser") {
    localStorage.setItem("userName", action.user);
    return Object.assign({}, state, {user: action.user});

    } else if (action.type == "setTalks") {
    return Object.assign({}, state, {talks: action.talks});

    } else if (action.type == "newTalk") {
        fetchOK(talkURL(action.title), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                presenter: state.user,
                summary: action.summary
            })
        }).catch(reportError);      
    } else if (action.type == "deleteTalk") {
    fetchOK(talkURL(action.talk), {method: "DELETE"})
    .catch(reportError);

    } else if (action.type == "newComment") {
        fetchOK(talkURL(action.talk) + "/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            author: state.user,
            message: action.message
            })
        }).catch(reportError);
    }
    return state;
}

//rendering component
function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name: ", elt("input", {
        type: "text",
        value: name,
        onchange(event) {
            dispatch({type: "setUser", user: event.target.value});
        }
    }));
}

function renderTalk(talk, dispatch) {
    return elt(
        "section", {className: "talk"},
        elt("h2", null, talk.title, " ", elt("button", {
            type: "button",
            onclick() {
                dispatch({type: "deleteTalk", talk: talk.title});
            }
            }, "Delete")),
            elt("div", null, "by ",
            elt("strong", null, talk.presenter)),
            elt("p", null, talk.summary),
            ...talk.comments.map(renderComment),
            elt("form", {
            onsubmit(event) {
                event.preventDefault();
                let form = event.target;
                dispatch({type: "newComment",
                talk: talk.title,
                message: form.elements.comment.value});
                form.reset();
        }
        }, elt("input", {type: "text", name: "comment"}), " ",
    elt("button", {type: "submit"}, "Add comment")));
}

//polling
async function pollTalks(update) {
    let tag = undefined;
    for (;;) {
        let response;
        try {
        response = await fetchOK("/talks", {
            headers: tag && {"If-None-Match": tag,
            "Prefer": "wait=90"}
        });
        } catch (e) {
            console.log("Request failed: " + e);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }
        if (response.status == 304) continue;
        tag = response.headers.get("ETag");
        update(await response.json());
    }
}

//the application
class SkillShareApp {
    constructor(state, dispatch) {
            this.dispatch = dispatch;
            this.talkDOM = elt("div", {className: "talks"});
            this.dom = elt("div", null,
            
            renderUserField(state.user, dispatch),
            this.talkDOM,
            renderTalkForm(dispatch));
            
            this.syncState(state);
        }
        syncState(state) {
        if (state.talks != this.talks) {
            this.talkDOM.textContent = "";
            for (let talk of state.talks) {
                this.talkDOM.appendChild(
                renderTalk(talk, this.dispatch));
            }
            this.talks = state.talks;
        }
    }
}

function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    let state, app;
    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }
    pollTalks(talks => {
        if (!app) {
            state = {user, talks};
            app = new SkillShareApp(state, dispatch);
            document.body.appendChild(app.dom);
            } else {
            dispatch({type: "setTalks", talks});
        }
    }).catch(reportError);
}
runApp();