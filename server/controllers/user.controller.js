import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// authentication jwt token function 
dotenv.config();

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
}


const registerUser = async (req, res) => {
    console.log("Received request body:", req.body);

    // grab data 
    const {email, password} = req.body;

    //check the fields
    if(!email || !password) {
        return res.status(400).json({msg: "Please fill in all fields"});
    }
    // check email if unique
    const exist = await User.findOne({email});
    if(exist){
        return res.status(400).json({msg: "email already taken"});
    }
    // hashed password 
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({email, password: hashed});
        // json webtoken auth
        const token = createToken(user._id)
        res.status(200).json({msg: "user created succesfully", token, email: user.email});
    } catch (error) {
        return res.status(500).json({msg: "internal server error" , error});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // check if fields are empty
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Incorrect email" });
    }

    // check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Incorrect password" });
    }

    try {
        // create token and return
        const token = createToken(user._id);
        res.status(200).json({ msg: "Login successful", token, email: user.email });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error });
    }
};



export {registerUser, loginUser};