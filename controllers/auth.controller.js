import { Usuario } from '../models/Usuario.js'

export const registro = async (req, res) => {
  const { nombres, usuario, rol, correo, password } = req.body
  try {
    const nuevoUsuario = new Usuario({ nombres, usuario, rol, correo, password })
    await nuevoUsuario.save()
    return res.json({
      mensaje: 'Usuario registrado'
    })
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  console.log(req.body)
  res.json({ mensaje: 'Inicio de sesión exitoso' })
}
