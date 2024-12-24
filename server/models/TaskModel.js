
const mongoose = require('mongoose');
const assignSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    AboutTask: { type: String, required: true },
    status: { type: String },
    DueDate: { type: Date, default: Date("<YYYY-mm-dd>") },
    checkVal: [],
    StartDate: { type: Date, default: Date("<YYYY-mm-dd>") },

})
const TaskModel = mongoose.model('Task', assignSchema)
module.exports = TaskModel
