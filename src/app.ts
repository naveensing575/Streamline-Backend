import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'
import adminRoutes from './routes/adminRoutes'
import { errorHandler } from './middlewares/errorMiddleware'

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'https://streamline-navi.netlify.app',
    credentials: true,
  })
)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
if (process.env.NODE_ENV === 'production') app.use(morgan('combined'))

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/admin/users', adminRoutes)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' })
})

app.use(errorHandler)

export default app
