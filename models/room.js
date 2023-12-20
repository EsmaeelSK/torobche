const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    room:{
        type:Array ,

    },
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;