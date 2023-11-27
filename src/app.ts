import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UsersRoutes } from './app/config/modules/users/users.route'

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', UsersRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
