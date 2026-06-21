import express from "express";
import cors from "cors";
import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Backend is working");
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Your app is running on http://localhost:${port}`)
})