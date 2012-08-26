var Map = require("./map")
    , Player = require("./player")
    , level = require("./levels")
    , body = document.body

var map = Map()
    , player = Player(50, 50)

map.addEntity(player)

map.appendTo(body)

level(map)