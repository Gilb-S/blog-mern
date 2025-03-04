import express from 'express';
import { postRoutes } from './routes/postRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

mongoose.connect("mongodb://localhost:27017/", {dbName: "demo_db"}).then(() => {
    console.log("connected to mongodb");
}).catch((err) => console.log(err)) 


app.listen(4000, "localhost", () =>{
    console.log("server is running on localhost:4000");
} )