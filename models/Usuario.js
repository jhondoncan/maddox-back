import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema, model } = mongoose

const usuarioSchema = new Schema({
  nombres: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: { unique: true }
  },
  rol: {
    type: String,
    required: true,
    enum: ['adminatrador', 'usuario', 'trabajador', 'capataz'],
    default: 'trabajador'
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
})

// Encriptar el password antes de guardar
usuarioSchema.pre('save', function (next) {
  const usuario = this
  if (!usuario.isModified('password')) return next()

  try {
    const salt = bcrypt.genSalt(10)
    usuario.password = bcrypt.hash(usuario.password, salt)
    next()
  } catch (error) {
    console.log(error)
    throw new Error('Error al encriptar la contraseña')
  }
})

// Verificar si el password es correcto
usuarioSchema.methods.compararPassword = async function (canidatoPassword) {
  return await bcrypt.compare(canidatoPassword, this.password)
}

export const Usuario = model('usuario', usuarioSchema)
