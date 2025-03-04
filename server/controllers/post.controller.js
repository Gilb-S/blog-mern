import Post from "../models/post.model.js";
import mongoose from "mongoose";
import User from '../models/user.model.js'
// get post
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: "desc"});
        res.status(200).json({posts});
    } catch (error) {
        res.status(400).json({msg: "error"});
    }
}
// user get
const getUserPost = async (req, res) => {

    const user = await User.findById(req.user._id)
    try {
        const userPosts = await Post.find({ user: user._id }).sort({createdAt: "desc"});
        res.status(200).json({userPosts, email: user.email});
    } catch (error) {
        res.status(400).json({msg: "error"});
    }
}
// create post 
const createPost =  async(req, res) => {
     const {title, body} = req.body;

    if(!title || !body){
        return res.status(400).json({msg: "All fields are required"});
    }

    // grab auth user
    const user = await User.findById(req.user._id)

    try{
        const post = await Post.create({user: user._id, title, body});
        return res.status(200).json({msg: "success", post});
    } 
     catch(err) { 
        return res.status(400).json({msg: "internal server err", err});
    }
}
// deletepost
const deletePost = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({msg: "invalid object _id"});
    }
    // check exist
    const post = await Post.findById(req.params.id);
    if(!post) { 
        return res.status(400).json({msg: "post not found :("});
    }

    // check if the owner owns the post 
    const user = await User.findById(req.user._id)
    if(!post.user.equals(user._id)){
        return res.status(401).json({msg: "not authorized to delete this post"});
    }

    try {
        await post.deleteOne();
        return res.status(200).json({msg: "successfully deleted"})
    } catch (error) {
        return res.status(400).json({msg: "internal server err", error});
    }
}
// mix and max ng delete and put
const UpdatePost = async (req, res) => {
    const {title, body} = req.body;
    // check the field 
    if(!title || !body){
        return res.status(400).json({msg: "All fields are required"});
    }

    // check the id 
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({msg: "invalid object _id"});
    }

    // check the post exist or not 
    const post = await Post.findById(req.params.id);
    if(!post) { 
        return res.status(400).json({msg: "post not found :("});
    }

    // check if the user own the post 
    const user = await User.findById(req.user._id)
    if(!post.user.equals(user._id)){
        return res.status(401).json({msg: "not authorized to delete this post"});
    }

    try {
        await post.updateOne({title, body});
        res.status(200).json({messgae: "update successfully "})
    } catch (error) {   
        res.status(500).json({msg: "internal server error", error});
    }
}

export {getPosts, createPost, deletePost, UpdatePost, getUserPost};