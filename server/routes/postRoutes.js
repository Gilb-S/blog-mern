import express from "express";
import auth from '../middlewares/auth.js'
import { createPost, deletePost, getPosts, getUserPost, UpdatePost } from "../controllers/post.controller.js";

const router = express.Router();
// get all post 
router.get("/", getPosts)
// get all post
router.get("/user", auth, getUserPost)

// create post -- posts
router.post('/create', auth , createPost)

//delete [post]
router.delete('/delete/:id', auth, deletePost)
// update / patach [post]
router.put('/update/:id', auth, UpdatePost)





export {router as postRoutes}