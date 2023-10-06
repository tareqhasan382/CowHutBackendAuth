import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoute } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { CowRoute } from './app/modules/cow/cow.route'
import httpStatus from 'http-status'
import { OrderRoute } from './app/modules/order/order.route'
//import ApiError from './errors/ApiError'
import cookieParser from 'cookie-parser'
import { AdminRoute } from './app/modules/admin/admin.route'
app.use(cors())
app.use(cookieParser())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Applications route

app.use('/api/v1', AdminRoute)
app.use('/api/v1', UserRoute)
app.use('/api/v1', CowRoute)
app.use('/api/v1', OrderRoute)
//Testing Route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error log')
// })

//  global error handling || next => Error 4 parameter ||
app.use(globalErrorHandler)

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API NOT FOUND!',
      },
    ],
  })
  next()
})

export default app
