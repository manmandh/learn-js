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