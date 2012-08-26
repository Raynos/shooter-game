var Input = require("./input")
    , Widget = require("./widget")

module.exports = Player

function Player() {
    var input = Input()
        , widget = Widget()
        , player = {}

    player.appendTo = widget.appendTo

    return player
}