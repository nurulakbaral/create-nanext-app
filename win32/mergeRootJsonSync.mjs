import { fs } from 'zx'

export function mergeRootJsonSync({ rootJsonPath, fileJsonPath, rootName }) {
  let rootContent = fs.readJsonSync(rootJsonPath)
  let fileContent = fs.readJsonSync(fileJsonPath)
  const objMerged = { ...rootContent, [rootName]: { ...rootContent[rootName], ...fileContent } }
  const objString = JSON.stringify(objMerged, null, 2)
  fs.writeFileSync(rootJsonPath, objString)
}
