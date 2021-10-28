import express from "express"
import listEndpoints from "express-list-endpoints";
import blogsRouter from "./Blogs/index.js"
import cors from "cors";
import {join} from "path"

const imageFolderPath = join(process.cwd(),"./public")


const server = express()
server.use(cors())
server.use(express.json())
server.use(express.static(imageFolderPath))

server.use("/blogs",blogsRouter)

const port = process.env.PORT
console.table(listEndpoints(server))

server.listen(port,()=>
    console.log("successfully running on port:",port))

server.on('error', (err) => console.log(err))