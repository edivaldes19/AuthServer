const mongoose = require("mongoose")
const dbConnection = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.BD_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('DB ONLINE'))
        .catch(err => console.log(err))
}
module.exports = { dbConnection }