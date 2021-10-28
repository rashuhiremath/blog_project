import fs from "fs-extra"
import {fileURLToPath} from "url";
import {join, dirname} from "path";

const {readJSON,writeJSON,writeFile,createReadStream}= fs

//const blogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/blogs.json")
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
  const imageFolderPath = join(process.cwd(),"./public/img/blogsImage")

    const blogsJSONPath = join(dataFolderPath, "blogs.json")

export const readBlogs = () => readJSON(blogsJSONPath)
export const writeBlogs = content => writeJSON(blogsJSONPath, content) // content is array
export const saveProductPicture = (filename,buffer) =>{
    writeFile(join(imageFolderPath,filename),buffer)}

export const getBooksReadableStream = () => createReadStream(blogsJSONPath)





