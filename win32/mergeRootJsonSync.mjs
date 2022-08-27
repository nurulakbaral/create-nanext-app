import { fs } from 'zx'

export function mergeRootJsonSync({ rootJsonPath, rootName, jsonFile, isOverride = false }) {
  let rootContent = fs.readJsonSync(rootJsonPath)
  const objContent = isOverride ? jsonFile : { ...rootContent[rootName], ...jsonFile }
  const objMerged = { ...rootContent, [rootName]: { ...objContent } }
  const objString = JSON.stringify(objMerged, null, 2)
  fs.writeFileSync(rootJsonPath, objString)
}
