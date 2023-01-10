const { request, response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario existente.'
            })
        }
        const dbUsuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync()
        dbUsuario.password = bcrypt.hashSync(password, salt)
        const token = await generarJWT(dbUsuario.id, name)
        await dbUsuario.save()
        return res.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            name: dbUsuario.name,
            email: dbUsuario.email,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        })
    }
}
const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body
    try {
        const dbUsuario = await Usuario.findOne({ email })
        if (!dbUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo electrónico inexistente.'
            })
        }
        const validPassword = bcrypt.compareSync(password, dbUsuario.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta.'
            })
        }
        const token = await generarJWT(dbUsuario.id, dbUsuario.name)
        return res.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            name: dbUsuario.name,
            email,
            token
        })
    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}
const renovarToken = async (req = request, res = response) => {
    const { uid } = req
    const dbUsuario = await Usuario.findById(uid)
    generarJWT(uid, dbUsuario.name)
        .then(tk => {
            return res.json({
                ok: true,
                uid,
                name: dbUsuario.name,
                email: dbUsuario.email,
                token: tk
            })
        })
        .catch(err => {
            return res.json({
                ok: false,
                msg: err
            })
        })
}
module.exports = { crearUsuario, loginUsuario, renovarToken }