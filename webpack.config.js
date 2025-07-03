import path from "path"
import { fileURLToPath } from "url"
import TerserWebpackPlugin  from "terser-webpack-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "development",
    target: [ "web", "es5" ],
    entry: "./src/client/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public", "assets/js"),
        clean: true
    },
    optimization: {
        minimizer: [ new TerserWebpackPlugin() ]
    },
    module: {
        rules: [{
            test: /\.json$/,
            type: "json"
        }]
    }
}