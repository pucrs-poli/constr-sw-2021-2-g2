const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: String,
        firstName: String,
        lastName: String,
        emailVerified: Boolean,
        enabled: Boolean
    },
    {
        timestamps: false,
        versionKey: false,
    }
)


module.exports = mongoose.model('Users', UserSchema)