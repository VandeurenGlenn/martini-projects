import nodeResolve from "@rollup/plugin-node-resolve";
import { readdir } from 'fs/promises'
import { join } from "path";

let views = await readdir('src/views')
views = views.map(view => join('src/views', view))
export default [{
  input: ['./src/shell.js', ...views],
  output: {
    dir: 'www',
    format: 'es'
  },
  plugins: [
    nodeResolve()
  ]
}]