import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import 'dotenv/config'
import { userRouter } from './routes/users.js'
import { itemRouter } from './routes/items.js'

const app = express()
const PORT = process.env.PORT || 8080
const MONGO_DB = process.env.MONGO_DB
app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/items", itemRouter)

mongoose.connect(MONGO_DB)

app.listen(PORT, () =>{
    console.log(`Server up and running on Port ${PORT}`)
})

