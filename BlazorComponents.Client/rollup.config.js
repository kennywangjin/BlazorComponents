import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript";
import { uglify } from 'rollup-plugin-uglify';

const isDev = process.env.build === 'development';

export default {
    input: "src/components.ts",
    output: {
        dir: "../BlazorComponents/wwwroot",
        format: "iife",
        globals: { highcharts: "Highcharts", jquery: "$" }
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss({
            extract: true,
            minimize: !isDev,
            sourceMap: false
        })
    ].concat(isDev ? [] : [uglify()]),
    external: ["highcharts", "jquery"],
    watch: {
        include: "src/**"
    }
};
