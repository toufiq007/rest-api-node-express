import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js";
dotenv.config()

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json())

// user routes
app.use('/api',userRoutes)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})