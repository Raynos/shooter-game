var Widget = require("./widget")
    , through = require("through")

module.exports = Map

function Map() {
    var widget = Widget(600, 400)
        , blocks = {}
        , map = {}

    map.addEntity = addEntity
    map.addBlock = addBlock
    map.appendTo = widget.appendTo

    return map

    /*
        When an entity emit deltas in position we pipe it through a
            validator which checks collisions and then
            pipe it back into the entity if the validator thinks there are
            no collisions
    */
    function addEntity(entity) {
        entity.pipe(through(detectCollisions)).pipe(entity)

        addBlock(entity)

        function detectCollisions(data) {
            
        }
    }

    function addBlock(block) {
        blocks[block.x + ":" + block.y] = block
        widget.addBlock(block)
    }
}