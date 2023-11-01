class Picture {
    constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
    }
    static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
    }
    pixel(x, y) {
    return this.pixels[x + y * this.width];
    }
    draw(pixels) {
    let copy = this.pixels.slice();
    for (let {x, y, color} of pixels) {
    copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
    }
}

function updateState(state, action) {
    return Object.assign({}, state, action);
}

//dom building
function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}

//the canvas
const scale = 10;
class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });
    this.syncState(picture);
    }

    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }
}

function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");
    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
        cx.fillStyle = picture.pixel(x, y);
        cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

PictureCanvas.prototype.mouse = function(downEvent, onDown) {
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = moveEvent => {
    if (moveEvent.buttons == 0) {
    this.dom.removeEventListener("mousemove", move);
    } else {
    let newPos = pointerPosition(moveEvent, this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
    }
    };
    this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {x: Math.floor((pos.clientX - rect.left) / scale),
    y: Math.floor((pos.clientY - rect.top) / scale)};
}

PictureCanvas.prototype.touch = function(startEvent,
    onDown) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = moveEvent => {
    let newPos = pointerPosition(moveEvent.touches[0],
    this.dom);
    
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
    };
    let end = () => {
    this.dom.removeEventListener("touchmove", move);
    this.dom.removeEventListener("touchend", end);
    };
    this.dom.addEventListener("touchmove", move);
    this.dom.addEventListener("touchend", end);
};

//the application
class PixelEditor {
    constructor(state, config) {
    let {tools, controls, dispatch} = config;
    this.state = state;
    this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) return pos => onMove(pos, this.state);
    });
    this.controls = controls.map(
    Control => new Control(state, config));
    this.dom = elt("div", {}, this.canvas.dom, elt("br"),
    
    ...this.controls.reduce(
    (a, c) => a.concat(" ", c.dom), []));
    }
    syncState(state) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) ctrl.syncState(state);
    }
}

class ToolSelect {
    constructor(state, {tools, dispatch}) {
    this.select = elt("select", {
    onchange: () => dispatch({tool: this.select.value})
    }, ...Object.keys(tools).map(name => elt("option", {
    selected: name == state.tool
    }, name)));
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
    }
    syncState(state) { this.select.value = state.tool; }
}

//drawing tools
function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
    let drawn = {x, y, color: state.color};
    dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
}

function rectangle(start, state, dispatch) {
    function drawRectangle(pos) {
        let xStart = Math.min(start.x, pos.x);
        let yStart = Math.min(start.y, pos.y);
        let xEnd = Math.max(start.x, pos.x);
        let yEnd = Math.max(start.y, pos.y);
        let drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: state.color});
            }
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
    drawRectangle(start);
    return drawRectangle;
}

//saving and loading
class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt("button", {
        onclick: () => this.save()
        }, "💾 Save");
    }
    save(){
        let canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        let link = elt("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state) {
        this.picture = state.picture; 
    }
}

class LoadButton {
    constructor(_, {dispatch}) {
        this.dom = elt("button", {
        onclick: () => startLoad(dispatch)
        }, "📁 Load");
    }
    syncState() {}
}
function startLoad(dispatch) {
    let input = elt("input", {
        type: "file",
        onchange: () => finishLoad(input.files[0], dispatch)
        });
    document.body.appendChild(input);
    input.click();
    input.remove();
}

function finishLoad(file, dispatch) {
    if (file == null) return;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let image = elt("img", {
            onload: () => dispatch({
                picture: pictureFromImage(image)
            }),
            src: reader.result
        });
    });
    reader.readAsDataURL(file);
}

//undo histotry
function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0) return state;
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        });
    } else if (action.picture && state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, action, {
        done: [state.picture, ...state.done],
        doneAt: Date.now()
        });
    } else {
        return Object.assign({}, state, action);
    }
}

//draw
const startState = {
    tool: "draw",
    color: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
};
const baseTools = {draw, fill, rectangle, pick};
const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];
function startPixelEditor({state = startState, tools = baseTools,controls = baseControls}) {
    let app = new PixelEditor(state, {tools,controls,
    dispatch(action) {
        state = historyUpdateState(state, action);
        app.syncState(state);
    }
    });
    return app.dom;
}