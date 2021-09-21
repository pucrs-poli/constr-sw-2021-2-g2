const mongoose = require("mongoose");


const EnrollSchema = new mongoose.Schema(
    {
        semester: {
            type: String,
            required: true,
            unique: true
        },
        classId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        studentId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: false
    }
);


module.exports = mongoose.model("Enrolls", EnrollSchema);