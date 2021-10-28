import fs from "fs-extra"
import {fileURLToPath} from "url";
import {join, dirname} from "path";

const {readJSON,writeJSON,writeFile}= fs

const blogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/blogs.json")
  const imageFolderPath = join(process.cwd(),"./public/img/blogsImage")
   const booksJSONPath = join(blogsJSONPath, "blogs.json")

export const readBlogs = () => readJSON(blogsJSONPath)
export const writeBlogs = content => writeJSON(blogsJSONPath, content) // content is array
export const saveProductPicture = (filename,buffer) =>{
    writeFile(join(imageFolderPath,filename),buffer)}

export const getBooksReadableStream = () => createReadStream(booksJSONPath)





