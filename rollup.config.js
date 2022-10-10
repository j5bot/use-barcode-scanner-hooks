import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from 'autoprefixer';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const makeDefaultConfig = (hooksOrComponents) => {
    return [
        {
            input: `src/${hooksOrComponents}/index.ts`,
            output: [
                {
                    file: packageJson[hooksOrComponents].main,
                    format: "cjs",
                    sourcemap: true,
                },
                {
                    file: packageJson[hooksOrComponents].module,
                    format: "esm",
                    sourcemap: true,
                },
            ],
            external: [ 'react', 'react-dom' ],
            plugins: [
                resolve(),
                commonjs(),
                typescript({ tsconfig: `./tsconfig.${hooksOrComponents}.json` }),
                postcss({
                    plugins: [autoprefixer()],
                    sourceMap: true,
                    extract: true,
                    minimize: true,
                }),
                excludeDependenciesFromBundle({ peerDependencies: true }),
            ],
        },
        {
            input: `dist/${hooksOrComponents}/esm/index.d.ts`,
            output: [{ file: `dist/${hooksOrComponents}/index.d.ts`, format: "esm" }],
            external: [ 'react', 'react-dom' ],
            plugins: [
                dts(),
                excludeDependenciesFromBundle({ peerDependencies: true }),
            ],
        }
    ];
};

export default [
    ...makeDefaultConfig('hooks'),
    ...makeDefaultConfig('components'),
];
