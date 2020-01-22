import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const isDev = process.env.build === "development";

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
  ].concat(isDev ? [] : [terser()]),
  external: ["highcharts", "jquery"],
  watch: {
    include: "src/**"
  }
};
