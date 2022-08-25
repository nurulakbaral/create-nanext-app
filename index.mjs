#!/usr/bin/env node

import {
  settingsContent,
  documentContent,
  readmeContent,
  prettierContent,
  eslintignoreContent,
  prettierignoreContent,
  eslintrcContent,
} from './contents.mjs'
import { $, echo, question, chalk, cd, fs } from 'zx'

/**
 * Greetings!
 */

echo`👋 Hello! Welcome to create-nanext-app!`

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
  let objString = JSON.stringify(objMerged)
  return await $`echo ${objString} > ${filePath}`
}

/**
 * Create official template Next App!
 */

let projectName = await question('❔ What is your project named? ')
let pkgManager = await question('📦 Choose your package manager (Enter: npm/yarn/pnpm): ')
let isTypeScript = await question('🐳 With TypeScript? (Enter: y/n): ')
let defaultTypeScript = [...yes, ...no].includes(isTypeScript.toLowerCase()) ? isTypeScript : 'y'

try {
  if (pkgManager === 'npm') {
    await $`npx create-next-app@latest ${projectName} ${useTypeScript(defaultTypeScript) ? '--ts' : ''}`
  } else if (pkgManager === 'yarn') {
    await $`yarn create next-app ${projectName} ${useTypeScript(defaultTypeScript) ? '--typescript' : ''}`
  } else if (pkgManager === 'pnpm') {
    await $`pnpm create next-app ${projectName} ${projectName} ${useTypeScript(defaultTypeScript) ? '--ts' : ''}`
  } else {
    await $`exit 1`
  }
} catch (err) {
  echo`Exit code: ${err.exitCode}`
  echo`Error: Please choose package manager name correctly!`
}

/**
 * Create struture folder!
 */

echo`📂 Create folder structure....`
cd(`${projectName}`)

// .tsconfig
const tsconfigExtends = {
  baseUrl: './',
  paths: {
    '~/*': ['./*'],
  },
}
await mergeRootJsonObj('./tsconfig.json', 'compilerOptions', tsconfigExtends)

// .vscode
await $`mkdir ./.vscode`
await $`touch ./.vscode/settings.json`
await $`echo ${settingsContent} > ./.vscode/settings.json`

// pages
await $`touch ./pages/_document.tsx`
await $`echo ${documentContent} > ./pages/_document.tsx`

// archives
await $`mkdir archives`
await $`touch ./archives/index.ts`
await $`echo "export {}" > ./archives/index.ts`

// src
await $`mkdir src`

await $`mkdir ./src/components`
await $`touch ./src/components/index.ts`
await $`echo "export {}" > ./src/components/index.ts`

await $`mkdir ./src/ui`
await $`touch ./src/ui/index.ts`
await $`echo "export {}" > ./src/ui/index.ts`

await $`mkdir ./src/utils`
await $`touch ./src/utils/index.ts`
await $`echo "export {}" > ./src/utils/index.ts`

await $`mkdir ./src/libs`
await $`touch ./src/libs/index.ts`
await $`echo "export {}" > ./src/libs/index.ts`

await $`mkdir ./src/hooks`
await $`touch ./src/hooks/index.ts`
await $`echo "export {}" > ./src/hooks/index.ts`

await $`mkdir ./src/services`
await $`touch ./src/services/index.ts`
await $`echo "export {}" > ./src/services/index.ts`

await $`touch ./src/types.ts`
await $`echo "export {}" > ./src/types.ts`

// styles
await $`sudo rm -rf styles`
await $`mkdir styles`
await $`touch ./styles/theme.ts`
await $`echo "export {}" > ./styles/theme.ts`
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
await question(`
============================================================================================
Copy this script to \`next.config.js\`: ${chalk.blue('eslint: { dirs: ["pages", "src"] }')}. 
If done, please ENTER.
============================================================================================
`)

// env
await $`touch .env`
await $`touch .env.local`
await $`touch .env.example`

// md
await $`touch NOTES.md`
await $`echo ${readmeContent} > ./README.md`

// husky
await $`npx mrm@2 lint-staged`
const packageExtends = {
  '*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
}
await mergeRootJsonObj('./package.json', 'lint-staged', packageExtends, true)

/**
 * Success!
 */

echo(`
============================================================================================
${chalk.green('Your application has been successfully installed.')}
============================================================================================
`)
