const mongoose = require('mongoose');
const notesSchema = mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },

    description: {
        type: String,
        required : true

    }
})

module.exports = mongoose.model('Notes',notesSchema);



