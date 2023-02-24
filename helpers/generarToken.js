import jwt from 'jsonwebtoken'

export const generarToken = (usuario) => {
  const token = jwt.sign({ id: usuario.id, nombres: usuario.nombres, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return token
}

export const generarRefreshToken = (usuario) => {
  const refreshToken = jwt.sign({ id: usuario.id, nombres: usuario.nombres, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '15m' })
  // eslint-disable-next-line no-undef
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !process.env.MODO === 'development',
    expires: new Date(Date.now() + (60 * 15))
  })
}
