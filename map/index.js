var Widget = require("./widget")

module.exports = Map

function Map() {
    var widget = Widget(600, 400)
        , blocks = {}
        , map = {}

    map.addEntity = addEntity
    map.addBlock = addBlock
    map.appendTo = widget.appendTo

    return map

    function addEntity(entity) {
        addBlock(entity)
    }

    function addBlock(block) {
        blocks[block.x + ":" + block.y] = block
        widget.addBlock(block)
    }
}