const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
router.post('/register', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo electrónico es obligatorio.').not().isEmpty(),
    check('email', 'El correo electrónico es inválido.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor o igual a 6 caracteres.').isLength(6),
    validarCampos
], crearUsuario)
router.post('/login', [
    check('email', 'El correo electrónico es obligatorio.').not().isEmpty(),
    check('email', 'El correo electrónico es inválido.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor o igual a 6 caracteres.').isLength(6),
    validarCampos
], loginUsuario)
router.get('/renew', validarJWT, renovarToken)
module.exports = router