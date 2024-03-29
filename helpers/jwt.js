const jwt = require('jsonwebtoken')
const generarJWT = (uid, name) => {
    const payload = { uid, name }
    return new Promise((resolve, reject) => jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '1h' }, (err, token) => err ? reject(err) : resolve(token)))
}
module.exports = { generarJWT }