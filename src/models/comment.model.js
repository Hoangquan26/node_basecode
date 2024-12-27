const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    leftNode: {
        type: Number,
        required: true,
        default: null
    },
    rightNode: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null
    }
}< {
    timestamps: true,
    collection: COLLECTION_NAME
});

const Comment = mongoose.model(DOCUMENT_NAME, commentSchema);

module.exports = Comment;