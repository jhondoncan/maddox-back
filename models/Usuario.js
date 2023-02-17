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
        enum: ['administrador', 'usuario'],
        default: 'usuario'
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

}, { versionKey: false }
)

// Encriptar el password antes de guardar
usuarioSchema.pre('save', async function (next) {
    const usuario = this
    // Verificar si el password fue modificado
    if (!usuario.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(usuario.password, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Error al encriptar la contraseña')
    }
})

// Metodo para verificar si el password es correcto
usuarioSchema.methods.compararPassword = async function (canidatoPassword) {
    return await bcrypt.compare(canidatoPassword, this.password)
}

export const Usuario = model('Usuario', usuarioSchema)
