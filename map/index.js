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

        /*

        */
        function detectCollisions(data) {
            //console.log("got changes", data)

            var changes = data[0]
                , diffX = changes.x || 0
                , diffY = changes.y || 0

            entity.x += diffX
            entity.y += diffY

            this.emit("data", [{
                x: entity.x
                , y: entity.y
            }, data[1], data[2]])
        }
    }

    function addBlock(block) {
        var gridPoint = getGrid(block)
            , loc = gridPoint.x + ":" + gridPoint.y
            , list = blocks[loc]

        if (list) {
            list.push(block)
        } else {
            blocks[loc] = [block]
        }

        widget.addBlock(block)
    }
}

function getGrid(point) {
    var x = point.x
        , y = point.y
        , diffX = x % 20
        , diffY = y % 20

    return {
        x: x - diffX
        , y: y - diffY
    }
}