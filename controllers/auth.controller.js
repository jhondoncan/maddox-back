import { Usuario } from '../models/Usuario.js'
import { generarToken } from '../helpers/generarToken.js'

export const registro = async (req, res) => {
  const { nombres, usuario, rol, correo, password } = req.body
  try {
    const nuevoUsuario = new Usuario({ nombres, usuario, rol, correo, password })
    await nuevoUsuario.save()
    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente' })
  } catch (error) {
    // Verificar si el correo o el usuario ya se encuentra registrado
    console.log(error)
    if (error.code === 11000) {
      if (error.keyPattern.usuario) {
        return res.status(400).json({
          mensaje: 'El usuario ya se encuentra registrado'
        })
      }
      if (error.keyPattern.correo) {
        return res.status(400).json({
          mensaje: 'El correo ya se encuentra registrado'
        })
      }
    }
    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body
    const usuarioInfo = await Usuario.findOne({ usuario })
    // Verificar si el usuario existe o si la contraseña es correcta
    if (!usuarioInfo || !(await usuarioInfo.compararPassword(password))) {
      return res.status(403).json({
        mensaje: 'Usuario o contraseña incorrectos'
      })
    }
    // Generar el token
    const token = generarToken(usuarioInfo)
    return res.status(200).json(token)
  } catch (error) {
    console.log(error)
  }
}
