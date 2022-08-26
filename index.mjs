#!/usr/bin/env node

import {
  settingsContent,
  documentContent,
  readmeContent,
  prettierContent,
  eslintignoreContent,
  prettierignoreContent,
  eslintrcContent,
  nextConfigJSContent,
  nextConfigTSContent,
} from './contents.mjs'
import { $, echo, question, chalk, cd, fs, os } from 'zx'

/**
 * Greetings!
 */

let isWin32 = os.platform() === 'win32'
if (isWin32) {
  echo(chalk.red('Sorry, this script is not supported on Windows!'))
  await $`exit 1`
}

echo`\n👋 Hello! Welcome to create-nanext-app!`

/**
 * Utils!
 */

let yes = ['y', 'yes']
let no = ['n', 'no']
function useTypeScript(param) {
  return yes.includes(param) ? true : false
}
async function mergeRootJsonObj(filePath, rootName, obj, isOverride = false) {
  let objFile = await fs.readJson(filePath)
  let objContent = isOverride ? { ...obj } : { ...objFile[rootName], ...obj }
  let objMerged = { ...objFile, [rootName]: { ...objContent } }
  let objString = JSON.stringify(objMerged, null, 2)
  return await $`echo ${objString} > ${filePath}`
}

/**
 * Create official template Next App!
 */

let projectName = await question('❔ What is your project named? ')
let pkgManager = await question('📦 Choose your package manager (Enter: npm/yarn): ', {
  choices: ['npm', 'yarn'],
})
let withTypeScript = await question('🐳 With TypeScript? (Enter: y/n): ', {
  choices: ['y', 'yes', 'n', 'no'],
})
let defaultTypeScript = [...yes, ...no].includes(withTypeScript.toLowerCase()) ? withTypeScript : 'y'
let isTypeScript = useTypeScript(defaultTypeScript)

try {
  if (pkgManager === 'npm') {
    await $`npx create-next-app@latest ${projectName} ${isTypeScript ? '--ts ' : ''}--use-npm`
  } else if (pkgManager === 'yarn') {
    await $`npx create-next-app@latest ${projectName} ${isTypeScript ? '--typescript ' : ''}--yarn`
  } else {
    throw new Error('❌ Error: Please choose package manager name correctly!')
  }
} catch (err) {
  echo`${err.message}`
  await $`exit 1`
}

/**
 * Create struture folder!
 */

echo`📂 Create folder structure....`
cd(`${projectName}`)

if (isTypeScript) {
  // .tsconfig
  let tsconfigExtends = {
    baseUrl: './',
    paths: {
      '~/*': ['./*'],
    },
  }
  await mergeRootJsonObj('./tsconfig.json', 'compilerOptions', tsconfigExtends)
}

// .vscode
await $`mkdir ./.vscode`
await $`touch ./.vscode/settings.json`
await $`echo ${settingsContent} > ./.vscode/settings.json`

// pages
let theJsx = isTypeScript ? 'tsx' : 'js'
let theJs = isTypeScript ? 'ts' : 'js'
await $`touch ./pages/_document.${theJsx}`
await $`echo ${documentContent} > ./pages/_document.${theJsx}`

// archives
await $`mkdir archives`
await $`touch ./archives/index.${theJs}`
await $`echo "export {}" > ./archives/index.${theJs}`

// src
await $`mkdir src`

await $`mkdir ./src/components`
await $`touch ./src/components/index.${theJs}`
await $`echo "export {}" > ./src/components/index.${theJs}`

await $`mkdir ./src/ui`
await $`touch ./src/ui/index.${theJs}`
await $`echo "export {}" > ./src/ui/index.${theJs}`

await $`mkdir ./src/utils`
await $`touch ./src/utils/index.${theJs}`
await $`echo "export {}" > ./src/utils/index.${theJs}`

await $`mkdir ./src/libs`
await $`touch ./src/libs/index.${theJs}`
await $`echo "export {}" > ./src/libs/index.${theJs}`

await $`mkdir ./src/hooks`
await $`touch ./src/hooks/index.${theJs}`
await $`echo "export {}" > ./src/hooks/index.${theJs}`

await $`mkdir ./src/services`
await $`touch ./src/services/index.${theJs}`
await $`echo "export {}" > ./src/services/index.${theJs}`

if (isTypeScript) {
  await $`touch ./src/types.ts`
  await $`echo "export {}" > ./src/types.ts`
}

// styles
await $`sudo rm -rf styles`
await $`mkdir styles`
await $`touch ./styles/theme.${theJs}`
await $`echo "export {}" > ./styles/theme.${theJs}`
await $`touch ./styles/globals.css`

// prettier and eslint
await $`yarn add -D prettier eslint-config-prettier`
await $`echo ${eslintrcContent} > ./.eslintrc.json`
await $`touch .eslintignore`
await $`echo ${eslintignoreContent} > ./.eslintignore`
await $`touch .prettierrc.json`
await $`echo ${prettierContent} > ./.prettierrc.json`
await $`touch .prettierignore`
await $`echo ${prettierignoreContent} > ./.prettierignore`
await $`echo ${isTypeScript ? nextConfigTSContent : nextConfigJSContent} > ./next.config.js`

// env
await $`touch .env`
await $`touch .env.local`
await $`touch .env.example`

// md
await $`touch NOTES.md`
await $`echo ${readmeContent} > ./README.md`

// husky
await $`npx mrm@2 lint-staged`
let lintStage = {
  '*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
}
let scriptsFormatExtends = {
  format: 'prettier --write "{pages,src,archives}/**/*.{js,jsx,ts,tsx}"',
}
await mergeRootJsonObj('./package.json', 'lint-staged', lintStage, true)
await mergeRootJsonObj('./package.json', 'scripts', scriptsFormatExtends)

/**
 * Git Commit!
 */

await $`git add .`
await $`git commit -m "chore: init setup"`

/**
 * Success!
 */

echo(`
============================================================================================
${chalk.green('Your application has been successfully installed.')}
============================================================================================
`)
