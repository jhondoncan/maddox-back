import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
  res.json({ mensaje: 'Iniciar sesión en Maddox' })
})

router.post('/registro', (req, res) => {
  res.json({ mensaje: 'Registrarse en Maddox' })
})

export default router