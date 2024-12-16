import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/db.config.js"
dotenv.config()
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"

//  database connection
connectDb()

const app = express()

//  middlewares
app.use(express.json())
app.use('/api/v1',productRoutes)
app.use('/api/v1/',categoryRoutes)
//  PORT NUMBER
const port = process.env.PORT || 5000


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})