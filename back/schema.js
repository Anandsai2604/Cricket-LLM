const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
    U_ID: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('user_stats', userStatsSchema);
