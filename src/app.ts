import express from 'express'
import userRouter from './presentation/routes/userRoutes';
import { errorHandler } from './presentation/middlewares/ErrorHandler';


const app = express()
app.use(express.json())

app.use('/user',userRouter)

app.use(errorHandler)

export default app; 