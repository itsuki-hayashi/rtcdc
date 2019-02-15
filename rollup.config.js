import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [{
    input: 'src/index.ts',
    output: [{
            name: 'rtcdc',
            file: pkg.browser,
            format: 'umd'
        },
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    plugins: [
        commonjs(), // For converting commonjs modules to ES modules.
        resolve(), // For finding modules.
        typescript({
            emitDeclarationOnly: false
        }), // For transpiling TypeScript code.
    ]
}];