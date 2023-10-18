function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
    } else {
    throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseApply(expr, program.slice(match[0].length));
}
    
function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

const specialForms = Object.create(null);
function evaluate(expr, scope) {
    if (expr.type == "value") {
        return expr.value;
        } else if (expr.type == "word") {
        if (expr.name in scope) {
        return scope[expr.name];
        } else {
        throw new ReferenceError(
        `Undefined binding: ${expr.name}`);
        }
        } else if (expr.type == "apply") {
        let {operator, args} = expr;
        if (operator.type == "word" &&
        operator.name in specialForms) {
        return specialForms[operator.name](expr.args, scope);
        } else {
        let op = evaluate(operator, scope);
        if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
        } else {
        throw new TypeError("Applying a non-function.");
        }
        }
    }
}

specialForms.while = (args, scope) => {
    if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
    }
    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;

};

let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));
// → false

specialForms.fun = (args, scope) => {
    if (!args.length) {
    throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];  
    let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
    throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
    });
    return function() {
    if (arguments.length != params.length) {
    throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
    localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
    };
};