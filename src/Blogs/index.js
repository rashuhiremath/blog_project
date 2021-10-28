import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import multer from "multer";
import json2csv from "json2csv"
import {
  readBlogs,
  writeBlogs,
  saveProductPicture,
  getBooksReadableStream,
} from "../libfile/fs_tool.js";
import { blogValidationMiddlewares } from "../libfile/validation.js";
import { extname } from "path";

//get blogs
const blogsRouter = express.Router();
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await readBlogs();
    res.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
});

//get id by blog
blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs();
    const singleBlog = blogs.find((blog) => blog.id == req.params.blogId);
    if (singleBlog) {
      console.log(singleBlog);
      res.status(200).send(singleBlog);
    } else {
      // next(createError(404, `review with id ${req.params.id} not found`))
    }
  } catch (error) {
    next(error);
  }
});

//post blog
blogsRouter.post("/", blogValidationMiddlewares, async (req, res, next) => {
  try {
    const blogs = await readBlogs();
    const newBlog = { ...req.body, id: uniqid(), createdAt: new Date() };
    blogs.push(newBlog);
    await writeBlogs(blogs);
    res.status(200).send(blogs.id);
  } catch (error) {
    next(error);
  }
});

//delete blog
blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs();
    const leftBlogs = blogs.filter((blog) => blog.id !== req.params.id);
    writeBlogs(leftBlogs);
    res.send("deleted successfully and id is:", blog.id);
  } catch (error) {
    next(error);
  }
});

//update the blog
blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs();
    const editBlogIndex = blogs.findIndex(
      (index) => index.id === req.params.id
    );
    const editBlog = blogs[editBlogIndex];
    const updatedBlog = {
      ...editBlog,
      ...req.body,
      id: uniqid(),
      createdAt: new Date(),
    };

    writeBlogs(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// post image
blogsRouter.post(
  "/:id/uploadSingle",
  multer().single("productPicture"),
  async (req, res, next) => {
    try {
      const fileName = req.file.originalname;
      console.log("File Name", fileName);

      const extension = extname(req.file.originalname);
      await saveProductPicture(req.params.id + extension, req.file.buffer);
      const blogs = await readBlogs();
      const singleBlog = blogs.find((blog) => blog.id === req.params.id);
      const avatar = `http://localhost:3002/img/blogsImage/${req.params.id}${extension}`;
      singleBlog.avatar = avatar;

      const blogsArray = blogs.filter((blog) => blog.id !== req.params.id);
      blogsArray.push(singleBlog);

      await writeBlogs(blogsArray);

      res.send("ok");
    } catch (error) {
      next(error);
    }
  }
);
// convert blog.json file csv
blogsRouter.get("/downloadCSV", (req, res, next) => {
    try {
      res.setHeader("Content-Disposition", "attachment; filename=blogs.csv")
      const source = getBooksReadableStream()
      const transform = new json2csv.Transform({ fields: ["name", "surname", "email", "DOB"] })
      const destination = res
  
      pipeline(source, transform, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })
export default blogsRouter;
