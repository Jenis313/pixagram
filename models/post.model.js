const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const likeSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User' //name of an another collection
//     },
//     action: {
//         type : String
//     }

// }, {
//     timestamps: true
// }) 
const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' //name of an another collection
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default : "https://res.cloudinary.com/jeniscloud/image/upload/v1645366518/Storyboard_Brainstorm_Presentation-min_snrnhu.png"
    },
    cloudinary_id : {
        type: String
    },
    likes: [],
    comments: [commentSchema],
    commentsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' //Name of an another collection
    },
    tags: [String],    
}, {
    timestamps: true
})
const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
