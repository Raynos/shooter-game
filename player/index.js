var ArrowKeys = require("arrow-keys")
    , Widget = require("./widget")
    , DeltaStream = require("delta-stream")
    , PositionChangeStream = require("./positionChange")
    , duplex = require("duplexer")
    , SPEED = 1

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
        , change = PositionChangeStream(SPEED)
        , state = DeltaStream()
        , player = duplex(state, change)

    player.appendTo = widget.appendTo
    player.x = x
    player.y = y

    input.pipe(change)

    state.pipe(widget)

    return player
}