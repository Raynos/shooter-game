var forEach = require("iterators").forEachSync
    , through = require("through")

module.exports = AttributeStream

function AttributeStream(elem) {
    var stream = through(updateAttribute)

    return stream

    function updateAttribute(data) {
        var changes = data[0]

        forEach(changes, setAttribute)
    }

    function setAttribute(value, key) {
        elem.setAttribute(key, value)
    }
}