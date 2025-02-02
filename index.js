import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./lib/dbConnect.js"
import authRouter from "./routes/auth.route.js"
import loanRouter from "./routes/loan.route.js"
import CategpryRouter from "./routes/category.route.js"

let app = express()
let port = process.env.PORT || 1222


app.use(cors())
app.use(express.json())
dotenv.config()


app.use("/users" , authRouter)
app.use("/api/loan" , loanRouter)
app.use("/category", CategpryRouter)

app.listen(4000 , () => {
    console.log("Server is running on port " + port)
    connectDB()
})