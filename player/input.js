var through = require("through")
    , KEYS = {
        "37": "left"
        , "38": "up"
        , "39": "right"
        , "40": "down"
    }
    , LEFT = 37
    , UP = 38
    , RIGHT = 39
    , DOWN = 40

module.exports = Input

function Input() {
    var stream = through()

    window.addEventListener("keydown", listenOnKeys)

    return stream

    function listenOnKeys(event) {
        var key = KEYS[event.which]
        
        if (key) {
            stream.write(key)
        }
    }
}