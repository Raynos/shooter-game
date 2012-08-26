var svg = require("./map.svg")
    , Fragment = require("fragment")

module.exports = Widget

function Widget(width, height) {
    var elem = Fragment(svg).firstChild
    elem.setAttribute("width", width)
    elem.setAttribute("height", height)

    return {
        appendTo: appendTo
        , addBlock: addBlock
    }
    
    function appendTo(other) {
        other.appendChild(elem)
    }

    function addBlock(block) {
        block.appendTo(elem)
    }
}