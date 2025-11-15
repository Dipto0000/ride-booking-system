import express, { Request, Response } from "express"
import cors from "cors"
import { router } from "./app/routes";

const app = express();


app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
  app.use(cors(corsOptions));

// app.use(cors());

app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to ride booking system backend"})
})


export default app;