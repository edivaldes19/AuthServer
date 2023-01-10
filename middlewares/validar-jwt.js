const { response, request } = require("express")
const jwt = require('jsonwebtoken')
const validarJWT = (req = request, res = response, next) => {
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token.'
        })
    }
    try {
        const { email, uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
        req.uid = uid
        req.email = email
        req.name = name
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error
        })
    }
    next()
}
module.exports = { validarJWT }