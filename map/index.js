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
                , newX = (entity.x += diffX)
                , newY = (entity.y += diffY)
                , loc = getGrid(newX, newY)
                , list = blocks[loc]

            var isValid = !collision(entity, list)

            if (isValid) {
                var previousLoc = getGrid(entity.x, entity.y)

                if (previousLoc !== loc) {
                    delete blocks[previousLoc]
                    blocks[loc] = entity
                }

                entity.x = newX
                entity.y = newY

                this.emit("data", [{
                    x: newX
                    , y: newY
                }, data[1], data[2]])
            } else {
                entity.x -= diffX
                entity.y -= diffY
            }
        }

        /*
            Returns true if there is a collison
        */
        function collision(block, list) {
            if (!list) {
                return true
            }

            return list.some(checkCollision, block)
        }

        function checkCollision(other) {
            if (this === other) {
                return false
            }

            return true
        }
    }

    function addBlock(block) {
        var loc = getGrid(block.x, block.y)
            , list = blocks[loc]

        if (list) {
            list.push(block)
        } else {
            blocks[loc] = [block]
        }

        widget.addBlock(block)
    }
}

function getGrid(x, y) {
    var diffX = x % 20
        , diffY = y % 20

    return (x - diffX) + ":" + (y - diffY)
}