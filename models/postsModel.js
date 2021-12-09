const mongoose = require("mongoose");

const PostsModel = mongoose.model(
    "projetFinal",
    {
        auteur: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    "messages"
)

// const MessagesModel = mongoose.model(
//     "projetFinal",
//     new Schema ({
//         auteur: {
//             type: String,
//             required: true
//         },
//         message: {
//             type: String,
//             required: true
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         }
//     })
// )

module.exports = { PostsModel };