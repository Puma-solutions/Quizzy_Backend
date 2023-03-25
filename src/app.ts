import express from "express"
import { authMiddleware } from "./middleware/auth.middleware"
import {errorHandling} from "./middleware/errorHandling"

import { authRouter } from "./routes/auth.routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',authRouter)

app.get('/',authMiddleware,(req,res)=>{
    res.send('Hola Mundo')
})

app.use(errorHandling)

export default app;