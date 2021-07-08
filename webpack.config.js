const fs = require("fs")
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const environment = require("./configs/env")
const path = require("path");

const templateFiles = fs.readdirSync(
    path.resolve(__dirname, environment.paths.source, "pages"),
);

const htmlPluginEntries = templateFiles.map((template) =>
    new HTMLWebpackPlugin({
        inject: true,
        hash: false,
        filename: template,
        template: path.resolve(environment.paths.source, "pages", template),
    })
);

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
        }),
    ].concat(htmlPluginEntries)
}