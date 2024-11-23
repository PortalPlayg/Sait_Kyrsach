const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }],
});

module.exports = mongoose.model('Event', EventSchema);
