import { Router } from 'express'
import { login, registro } from '../controllers/auth.controller.js'
import { validacionExpress } from '../middlewares/validacionExpress.js'
import { body } from 'express-validator'

const router = Router()

router.post('/login', [
  body('usuario', 'El usuario es obligatorio').trim().notEmpty().escape(),
  body('password', 'La contraseña es obligatoria').trim().notEmpty().escape(),
  body('password', 'La contraseña debe tener al menos 6 caracteres').trim().isLength({ min: 6 }).escape()
], validacionExpress, login)

router.post('/registro', [
  body('nombres', 'El nombre es obligatorio').trim().notEmpty().escape(),
  body('usuario', 'El nombre de usuario es obligatorio').trim().notEmpty().escape(),
  body('rol', 'El rol es obligatorio').trim().notEmpty().escape(),
  body('correo', 'El correo es obligatorio').trim().isEmail().normalizeEmail().notEmpty().escape(),
  body('password', 'La contraseña es obligatoria').trim().notEmpty().escape(),
  body('password', 'La contraseña debe tener al menos 6 caracteres').trim().isLength({ min: 6 }).notEmpty().escape()
], validacionExpress, registro)

export default router
