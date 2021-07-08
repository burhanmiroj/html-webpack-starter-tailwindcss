const { merge } = require("webpack-merge");
const common = require("./webpack.config");

// production require
module.exports = merge(common, {
    mode: "production"
})
