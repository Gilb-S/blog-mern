import mongoose from "mongoose";

//pattern
const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// return to mongose
const Post = mongoose.model("Post", PostSchema)

export default Post;