import express from "express";
import cors from "cors";
import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();
import { clerkMiddleware } from "@clerk/express"; 
import { connectDB } from "./lib/db.js";

const app = express();

app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());


app.get('/health', (req, res) => {
    res.status(200).json({ok: true});
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    connectDB();
    console.log(`Your app is running on http://localhost:${port}`)
})