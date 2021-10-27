import fs from "fs-extra"
import {fileURLToPath} from "url";
import {join, dirname} from "path";

const {readJSON,writeJSON} =fs

const blogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/blogs.json")


export const readBlogs = () => readJSON(blogsJSONPath)
export const writeBlogs = content => writeJSON(blogsJSONPath, content) // content is array



