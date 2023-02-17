
export const login = async (req, res) => {
  console.log(req.body)
  res.json({ mensaje: 'Inicio de sesión exitoso' })
}

export const registro = async (req, res) => {
  console.log(req.body)
  res.json({ mensaje: 'Registro exitoso' })
}
