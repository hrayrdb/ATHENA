const mongoose = require('mongoose');

const userSessionsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nSessions: { type: Number, default: 0 },
    nextSessionDate: { type: Date, default: null },
    mainProblem: { type: String, maxlength: 100 },
    sessions: { type: Map, of: String, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});

const UserSessions = mongoose.model('UserSessions', userSessionsSchema);

module.exports = UserSessions;