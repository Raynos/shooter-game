var through = require("through")
    , uuid = require("node-uuid")

module.exports = PositionChangeStream

function PositionChangeStream(speed) {
    var id = uuid()
    return through(translateInput)

    function translateInput(type) {
        var changes = {}
        if (type === "left") {
            changes.x = -speed
        } else if (type === "right") {
            changes.x = +speed
        } else if (type === "up") {
            changes.y = -speed
        } else if (type === "down") {
            changes.y = +speed
        }

        this.emit("data", [changes, Date.now(), id])
    }
}