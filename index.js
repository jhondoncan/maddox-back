import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import './database/connectdb.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.use('/', authRoutes)

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a Maddox'
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`)
})
