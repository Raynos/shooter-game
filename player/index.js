var Widget = require("./widget")
    , DeltaStream = require("delta-stream")
    , ArrowKeys = require("arrow-keys")
    , duplex = require("duplexer")
    , SPEED = 5

module.exports = Player

/*
    A player is a stream which emits requested changes in state and which when
    written to changes the actual state.

    Generally you hook the input up to the change requests and you hook the
    state upto the widget for rendering
*/
function Player(x, y) {
    var input = ArrowKeys()
        , widget = Widget(x, y)
        , player = duplex(widget, input)

    player.appendTo = widget.appendTo
    player.x = x
    player.y = y

    return player
}