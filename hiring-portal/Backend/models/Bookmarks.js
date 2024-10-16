const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    bookmarkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);