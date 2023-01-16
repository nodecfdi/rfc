import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const name = 'dist/rfc';

const bundle = (config) => ({
    ...config,
    input: 'src/index.ts',
    external: []
});

export default [
    bundle({
        plugins: [typescript(), terser(), nodeResolve(), commonjs()],
        output: [
            {
                file: `${name}.js`,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true
            },
            {
                name: 'rfc',
                file: `${name}.global.js`,
                format: 'iife',
                sourcemap: true
            }
        ]
    })
];
