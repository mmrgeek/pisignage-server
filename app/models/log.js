const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const LogSchema = new Schema({
    player: {
        _id: {
            type: Schema.ObjectId,
            ref: 'Player',
            index: true
        },
        name: {
            type: String
        },
        socket: {
            type: String,
            index: true
        }
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ['UP', "DOWN"]
    }
}, {
    usePushEach: true
})


LogSchema.statics = {
    getPlayerLogs: function (_id, from, to, cb) {
        this
            .find({
                _id: _id,
                date: {
                    $gt: from,
                    $lt: to
                }
            })
            .sort({ date: 'asc' })
            .exec(cb)
    }
}

mongoose.model('Log', LogSchema);