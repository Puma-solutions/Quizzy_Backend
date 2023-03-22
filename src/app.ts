import express from "express"
import {errorHandling} from "./middleware/errorHandling"

import { authRouter } from "./routes/auth.routes"

const app = express()

app.use(errorHandling)
app.use('/auth',authRouter)

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})

export default app;