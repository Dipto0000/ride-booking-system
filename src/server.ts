import {Server} from "http";
import donenv from "dotenv"
import mongoose from "mongoose";
import app from "./app";

donenv.config();

let server: Server;

const startServer = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Database connected successfully");

        server = app.listen(process.env.PORT,()=>{
            console.log(`Server is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();


