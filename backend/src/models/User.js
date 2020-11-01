const mongoose = require('mongoose');
const Location = require('./config/Location')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: {
        type: Location,
        //Se não funcionar mudar para outra collection
        indexes: '2dsphere'
    },
})

module.exports = mongoose.model('User', UserSchema);