const mongoose = require("mongoose");


const EnrollSchema = new mongoose.Schema(
    {
        semester: String,
        classId: mongoose.Types.ObjectId,
        studentId: mongoose.Types.ObjectId,
    },
    {
        timestamps: false,
        versionKey: false
    }
);

EnrollSchema.index({ semester: 1, classId: 1, studentId: 1 }, { unique: true });


module.exports = mongoose.model("Enrolls", EnrollSchema);