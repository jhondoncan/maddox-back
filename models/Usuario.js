import mongoose from 'mongoose'
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

export const Usuario = model('usuario', usuarioSchema)