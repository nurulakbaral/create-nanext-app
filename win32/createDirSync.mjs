import { fs, echo, chalk } from 'zx'

/**
 * `createDirSync` can overried the existing directory and files.
 */

export function createDirSync({ folderPath, fileName, fileContent }) {
  try {
    fs.ensureDirSync(folderPath)
    fs.ensureFileSync(`${folderPath}/${fileName}`)
    fs.writeFileSync(`${folderPath}/${fileName}`, fileContent)
    echo(chalk.green(`✔ ${folderPath}/${fileName} created!`))
  } catch (error) {
    echo(chalk.red(`✖ ${folderPath}/${fileName} failed to create`))
  }
}
