#!/usr/bin/env zx

/**
 * Extends JSON file
 */

// async function mergeRootJsonObject(filePath, rootName, obj) {
//   let objFile = await fs.readJson(filePath)
//   let objMerged = { ...objFile, [rootName]: { ...objFile[rootName], ...obj } }
//   let objString = JSON.stringify(objMerged)
//   return await $`echo ${objString} > ${filePath}`
// }

// await $`mkdir app`
// cd('app')
// await $`touch config.json`
// await $`echo '{ "hello": { "dev" : "run dev" } }' > config.json`

// await mergeRootJsonObject('config.json', 'hello', { build: 'run build' })

/**
 * Read file
 */

// await $`mkdir app`
// cd('app')
// await $`touch config.js`
// await $`echo '{ "hello": { "dev" : "run dev" } }' > config.js`
// const buffer = await fs.readFile('config.js')
// await $`touch output.js`
// const output = buffer.toString()
// await $`echo ${output} > output.js`