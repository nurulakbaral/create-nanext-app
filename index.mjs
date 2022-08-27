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
import { createFileSync, mergeRootJsonSync } from './win32/index.mjs'

/**
 * Greetings!
 */

const isWin32 = os.platform() === 'win32'
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
let theJsx = isTypeScript ? 'tsx' : 'js'
let theJs = isTypeScript ? 'ts' : 'js'

try {
  if (pkgManager === 'npm') {
    await $`npx create-next-app@latest ${projectName} ${isTypeScript ? '--ts' : ''} --use-npm`
  } else if (pkgManager === 'yarn') {
    await $`npx create-next-app@latest ${projectName} ${isTypeScript ? '--typescript' : ''} --yarn`
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
  if (!isWin32) {
    await mergeRootJsonObj('./tsconfig.json', 'compilerOptions', tsconfigExtends)
  } else {
    mergeRootJsonSync({
      rootJsonPath: './tsconfig.json',
      rootName: 'compilerOptions',
      jsonFile: tsconfigExtends,
    })
  }
}

// .vscode
if (!isWin32) {
  await $`mkdir ./.vscode`
  await $`touch ./.vscode/settings.json`
  await $`echo ${settingsContent} > ./.vscode/settings.json`
} else {
  createFileSync({
    name: '.vscode',
    filePath: './.vscode/settings.json',
    fileContent: settingsContent,
  })
}

// pages

if (!isWin32) {
  await $`touch ./pages/_document.${theJsx}`
  await $`echo ${documentContent} > ./pages/_document.${theJsx}`
} else {
  createFileSync({
    name: '_document',
    filePath: `./pages/_document.${theJsx}`,
    fileContent: documentContent,
  })
}

// archives
if (!isWin32) {
  await $`mkdir archives`
  await $`touch ./archives/index.${theJs}`
  await $`echo "export {}" > ./archives/index.${theJs}`
} else {
  createFileSync({
    name: 'archives/index',
    filePath: `./archives/index.${theJs}`,
    fileContent: 'export {}',
  })
}

// src
let folders = ['components', 'ui', 'utils', 'libs', 'hooks', 'services']
if (!isWin32) {
  await $`mkdir src`
  for (let folder of folders) {
    await $`mkdir ./src/${folder}`
    await $`touch ./src/${folder}/index.${theJs}`
    await $`echo "export {}" > ./src/${folder}/index.${theJs}`
  }
} else {
  for (let folder of folders) {
    createFileSync({
      name: `src/${folder}`,
      filePath: `./src/${folder}/index.${theJs}`,
      fileContent: 'export {}',
    })
  }
}

if (isTypeScript) {
  if (!isWin32) {
    await $`touch ./src/types.ts`
    await $`echo "export {}" > ./src/types.ts`
  } else {
    createFileSync({
      name: 'src/types',
      filePath: './src/types.ts',
      fileContent: 'export {}',
    })
  }
}

// styles
fs.removeSync('./styles')
if (!isWin32) {
  await $`mkdir styles`
  await $`touch ./styles/theme.${theJs}`
  await $`echo "export {}" > ./styles/theme.${theJs}`
  await $`touch ./styles/globals.css`
} else {
  createFileSync({
    name: 'styles/theme',
    filePath: `./styles/theme.${theJs}`,
    fileContent: 'export {}',
  })
  createFileSync({
    name: 'styles/globals',
    filePath: `./styles/globals.css`,
    fileContent: '',
  })
}

// prettier and eslint
await $`yarn add -D prettier eslint-config-prettier`
if (!isWin32) {
  await $`echo ${eslintrcContent} > ./.eslintrc.json`
  await $`touch .eslintignore`
  await $`echo ${eslintignoreContent} > ./.eslintignore`

  await $`touch .prettierrc.json`
  await $`echo ${prettierContent} > ./.prettierrc.json`
  await $`touch .prettierignore`
  await $`echo ${prettierignoreContent} > ./.prettierignore`

  await $`echo ${isTypeScript ? nextConfigTSContent : nextConfigJSContent} > ./next.config.js`
} else {
  createFileSync({
    name: '.eslintrc',
    filePath: './.eslintrc.json',
    fileContent: eslintrcContent,
  })
  createFileSync({
    name: '.eslintignore',
    filePath: './.eslintignore',
    fileContent: eslintignoreContent,
  })
  createFileSync({
    name: '.prettierrc',
    filePath: './.prettierrc.json',
    fileContent: prettierContent,
  })
  createFileSync({
    name: '.prettierignore',
    filePath: './.prettierignore',
    fileContent: prettierignoreContent,
  })
  createFileSync({
    name: 'next.config',
    filePath: './next.config.js',
    fileContent: isTypeScript ? nextConfigTSContent : nextConfigJSContent,
  })
}

// env
let envs = ['.env', '.env.local', '.env.example']
if (!isWin32) {
  for (let env of envs) {
    await $`touch ${env}`
  }
} else {
  for (let env of envs) {
    createFileSync({
      name: env,
      filePath: `./${env}`,
      fileContent: '',
    })
  }
}
// md
if (!isWin32) {
  await $`touch NOTES.md`
  await $`echo ${readmeContent} > ./README.md`
} else {
  createFileSync({
    name: 'NOTES',
    filePath: './NOTES.md',
    fileContent: '',
  })
  createFileSync({
    name: 'README',
    filePath: './README.md',
    fileContent: readmeContent,
  })
}

// husky
await $`npx mrm@2 lint-staged`
let lintStage = {
  '*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
}
let scriptsFormatExtends = {
  format: 'prettier --write "{pages,src,archives}/**/*.{js,jsx,ts,tsx}"',
}
if (!isWin32) {
  await mergeRootJsonObj('./package.json', 'lint-staged', lintStage, true)
  await mergeRootJsonObj('./package.json', 'scripts', scriptsFormatExtends)
} else {
  mergeRootJsonSync({
    rootJsonPath: './package.json',
    rootName: 'lint-staged',
    jsonFile: lintStage,
    isOverride: true,
  })
  mergeRootJsonSync({
    rootJsonPath: './package.json',
    rootName: 'scripts',
    jsonFile: scriptsFormatExtends,
  })
}

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
