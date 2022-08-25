export const settingsContent = `{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}`

export const documentContent = `import { Head, Html, Main, NextScript } from 'next/document'
export default function Document () {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta content='ie=edge' httpEquiv='X-UA-Compatible' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
}`

export const eslintrcContent = `{
  "extends": ["next", "next/core-web-vitals", "prettier"],
  "rules": {}
}`

export const prettierContent = `{
  "semi": false,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "jsxSingleQuote": true
}`

export const eslintignoreContent = `.next
node_modules
yarn.lock
public
dist
build`

export const prettierignoreContent = `.next
node_modules
yarn.lock
public
dist
build`

export const readmeContent = `# Installation
# Contributing`
