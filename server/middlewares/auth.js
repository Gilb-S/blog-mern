import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config();

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    // check if the request contains auth token
    if(!authorization){
       return res.status(401).json({msg: "authorization not found"});
    }

    // grab the token then convert into bearer token
    const token = authorization.split(" ")[1];

    try {
        //decode and extract id 
        const { _id } = jwt.verify(token,process.env.SECRET) 
        // save in req.body :D and select id 
        req.user = await User.findById(_id).select("_id");
        // next => middleware 
        next();
    } catch (error) {
       return res.status(401).json({error: error.message});
    }

}


export default auth