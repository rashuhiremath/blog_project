import express from "express"
import listEndpoints from "express-list-endpoints";
import blogsRouter from "./Blogs/index.js"
import cors from "cors";


const server = express()
server.use(cors())
server.use(express.json())

server.use("/blogs",blogsRouter)

const port = process.env.PORT
console.table(listEndpoints(server))

server.listen(port,()=>
    console.log("successfully running on port:",port))

server.on('error', (err) => console.log(err))