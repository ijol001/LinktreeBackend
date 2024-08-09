const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
