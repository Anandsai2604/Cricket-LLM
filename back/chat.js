const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    U_ID: { type: String, required: true },
    chats: [{
        question: { type: String, required: true },
        answer: { type: String, required: true } // Ensure this is required
    }]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
