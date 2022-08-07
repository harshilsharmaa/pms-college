const mongoose = require('mongoose');

const publication = new mongoose.Schema({
    title: {
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    journalName: {
        type: String,
    },
    yearOfPublication: {
        type: Number,
    },
    issnNumber: {
        type: Number,
    },
    journalLink:{
        type: String,
    },
    articalLink:{
        type: String,
    },
    listedInUGC:{
        type: Boolean,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Publication', publication);