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

export const indexDocumentContent = `import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Nanext App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Welcome to Create Nanext App
        </h1>
      </main>

      <footer
        style={{
          textAlign: 'center',
        }}
      >
        <a href='https://github.com/nurulakbaral' target='_blank' rel='noopener noreferrer'>
          Created by nurulakbaral
        </a>
        <div
          style={{
            marginTop: '12px',
          }}
        >
          <span>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </div>
      </footer>
    </div>
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

// next.config.js for Next.js v12.2.5

// docs: https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/typescript/next.config.js
export const nextConfigTSContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { 
    dirs: ["pages", "src"]
  }
}

module.exports = nextConfig`

// docs: https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/default/next.config.js
export const nextConfigJSContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { 
    dirs: ["pages", "src"]
  }
}

module.exports = nextConfig`
