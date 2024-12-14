import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/db.config.js"
dotenv.config()

//  database connection
connectDb()

const app = express()

//  PORT NUMBER
const port = process.env.PORT || 5000


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})