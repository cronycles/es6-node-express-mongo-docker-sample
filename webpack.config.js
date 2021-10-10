import path from "path";
import { URL } from "url";
import webpack from "webpack";

const __dirname = new URL(".", import.meta.url).pathname;

export default {
    entry: "./assets/js/main.js",
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "public"),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    mode: "development",
};
