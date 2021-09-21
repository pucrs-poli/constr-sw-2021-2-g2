const mongoose = require("mongoose");


const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        birthday: {
            type: Date,
            required: true
        },
        phone: {
            type: String,
            required: true,
            match: /\+\d{2}\(\d{2}\)\d{5}-\d{4}/
        }
    },
    {
        timestamps: false
    }
);


module.exports = mongoose.model("Students", StudentSchema);