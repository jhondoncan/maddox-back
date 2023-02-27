import jwt from 'jsonwebtoken'

export const generarToken = (usuario) => {
  const expiresIn = 60 * 60 // 1 hora
  const token = jwt.sign({ id: usuario.id, nombres: usuario.nombres, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn })
  return { token, expiresIn }
}

export const generarRefreshToken = (usuario) => {
  const expiresIn = 60 * 15 // 15 minutos
  const refreshToken = jwt.sign({ id: usuario.id, nombres: usuario.nombres, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn })
  // eslint-disable-next-line no-undef
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !process.env.MODO === 'development',
    expires: new Date(Date.now() + (60 * 15))
  })
}
