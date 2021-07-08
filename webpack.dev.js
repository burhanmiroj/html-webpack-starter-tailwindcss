const { merge } = require("webpack-merge");
const common = require("./webpack.config");

// development require
module.exports = merge(common, {
    mode: "development"
})