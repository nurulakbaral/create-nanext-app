import { fs, echo, chalk } from 'zx'

/**
 * `createFileSync` can create folder if doesn't exis.
 * `createFileSync` can overried the existing directory and files.
 * `filePath` param rules:
 * - ./<folder_name>/<file_name> ✔
 * - <folder_name>/<file_name> ✔
 * - ./<file_name> ✔
 * - <file_name> ✔
 * - /<folder_name>/<file_name> ✖
 * - /<file_name> ✖
 */

// Examples:

// Create folder, file and content
// createFileSync({
//   name: '_document',
//   filePath: './repl-dir/_document.tsx',
//   fileContent: `<h1>Hello World</h1>`,
// })

// Create file and content
// createFileSync({
//   name: '_document',
//   filePath: './_document.tsx',
//   fileContent: `<h1>Hello World</h1>`,
// })

export function createFileSync({ name = 'fileName', filePath, fileContent }) {
  let isError = !filePath || !filePath.trim()
  let isRelativePath = filePath[0] === '/'
  try {
    if (isError) {
      throw new TypeError(`Error(${name}): File path is required!`)
    }
    if (isRelativePath) {
      throw new TypeError(`Error(${name}): File path must be absolute! e.g <folder_name>/<file_name> or ./<file_name>`)
    }
    fs.ensureFileSync(`${filePath}`)
    fs.writeFileSync(`${filePath}`, fileContent)
    echo(chalk.green(`✔ ${filePath} created!`))
  } catch (error) {
    echo(isError || isRelativePath ? chalk.red(`✖ ${error.message}`) : chalk.red(`✖ ${filePath} failed to create!`))
  }
}
