const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    tag: { type: String }
},
    { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);