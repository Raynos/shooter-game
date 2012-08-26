var svg = require("./wall.svg")
    , Element = require("svg")

module.exports = Widget

function Widget(x, y) {
    var elem = Element(svg, "svg")
    elem.setAttribute("x", x)
    elem.setAttribute("y", y)

    return {
        appendTo: appendTo
    }
    
    function appendTo(other) {
        other.appendChild(elem)
    }
}