const mongoose = require("mongoose");


const StudentSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        birthday: Date,
        phone: String,
    },
    {
        timestamps: false,
        versionKey: false,
    }
);


module.exports = mongoose.model("Students", StudentSchema);