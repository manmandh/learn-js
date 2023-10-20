class Level {
    constructor(plan) {
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];
    this.rows = rows.map((row, y) => {
    return row.map((ch, x) => {
    let type = levelChars[ch];
    if (typeof type == "string") return type;
    this.startActors.push(
    type.create(new Vec(x, y), ch));
    return "empty";
    });
    });
    }
}

class State {
    constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    }
    static start(level) {
    return new State(level, level.startActors, "playing");
    }
    get player() {
    return this.actors.find(a => a.type == "player");
    }
}
class Lava {
    constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    }
    get type() { return "lava"; }
    static create(pos, ch) {
    if (ch == "=") {
    return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
    return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
    return new Lava(pos, new Vec(0, 3), pos);
    }
    }
}

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
    dom.appendChild(child);
    }
    return dom;
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
    let rect = elt("div", {class: `actor ${actor.type}`});
    rect.style.width = `${actor.size.x * scale}px`;
    rect.style.height = `${actor.size.y * scale}px`;
    
    rect.style.left = `${actor.pos.x * scale}px`;
    rect.style.top = `${actor.pos.y * scale}px`;
    return rect;
    }));
}

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
    if (keys.includes(event.key)) {
    down[event.key] = event.type == "keydown";
    event.preventDefault();
    }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}
const arrowKeys =trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);