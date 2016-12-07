var merge = require('webpack-merge')
var prodEnv = require("./prod.env.json")

module.exports = module.exports = merge(prodEnv, {
  NODE_ENV: '"production"'
})
