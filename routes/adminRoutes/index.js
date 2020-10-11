var fs = require('fs')

var dir = fs.readdirSync(__dirname)
module.exports = app => {
    dir.forEach(file => {
        if(!file.includes('index')){
            require(`./${file}`)(app)
        }
    })
}