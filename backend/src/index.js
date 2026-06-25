import express, { application } from "express";
import cors from "cors";
import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();

import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express"; 
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";

const app = express();

const publicDir = path.join(process.cwd(), "public");

// it is important that you don't parse the webhook event data, it should be in the raw format
app.use("/api/webhooks/clerk", express.raw({ type: "application/json"}), clerkWebhook);

app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());


app.get('/health', (req, res) => {
    res.status(200).json({ok: true});
})

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    })
}

const port = process.env.PORT || 3000

app.listen(port, () => {
    connectDB();
    console.log(`Your app is running on http://localhost:${port}`)

    if (process.env.NODE_ENV === "production") {
        job.start();
    }
})