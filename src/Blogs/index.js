import express from"express"
import uniqid from "uniqid";
import createError from "http-errors";
import multer from "multer";
import { readBlogs, writeBlogs } from "../libfile/fs_tool.js"
import {blogValidationMiddlewares } from "../libfile/validation.js"



//get blogs
const blogsRouter = express.Router()
blogsRouter.get("/",async (req,res,next)=>{
    try {
        const blogs = await readBlogs()
        res.status(200).send(blogs)
    } catch (error) {
        next(error)
    }
})

//get id by blog
blogsRouter.get("/:blogId",async (req,res,next)=>{
    try {

        const blogs = await readBlogs()
        const singleBlog = blogs.find((blog )=>blog._id === req.params.id)
        if (singleBlog) {
            res.status(200).send(singleBlogw)
        } else {
           // next(createError(404, `review with id ${req.params.id} not found`))
        }
        

        
    } catch (error) {
        next(error)
    }
})

//post blog
blogsRouter.post("/",blogValidationMiddlewares,async (req,res,next)=>{
    try {
        const blogs = await readBlogs()
        const newBlog = {...req.body, id:uniqid(), createdAt:new Date()}
        blogs.pu
        await writeBlogs(blogs)
        res.status(201).send(blogs.id)
        
    } catch (error) {
        
        next(error)
    }
})

//delete blog
blogsRouter.delete("/:blogId",async (req,res,next)=>{
    try {

        const blogs = await readBlogs()
        const leftBlogs = blogs.filter((blog)=>blog.id !== req.params.id )
      writeBlogs(leftBlogs)
      res.send("deleted successfully and id is:",blog.id)
        
    } catch (error) {
        next(error)
    }
})

//update the blog
blogsRouter.put("/:blogId",async (req,res,next)=>{
    try {
        const blogs = await readBlogs()
        const editBlogIndex = blogs.findIndex((index)=>index.id === req.params.id)
        const editBlog = blogs[editBlogIndex]
        const updatedBlog = {...editBlog,...req.body, id:uniqid(),createdAt:new Date()}

        writeBlogs(updatedBlog)
        
    } catch (error) {
        next(error)
    }
})

export default blogsRouter

