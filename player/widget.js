var Element = require("svg")
    , svg = require("./player")
    , AttributeStream = require("attribute")

module.exports = Widget

function Widget(x, y) {
    var elem = Element(svg)
        , stream = AttributeStream(elem)

    elem.setAttribute("x", x)
    elem.setAttribute("y", y)

    stream.appendTo = appendTo

    return stream

    function appendTo(other) {
        other.appendChild(elem)
    }
}