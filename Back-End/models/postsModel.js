const mongoose = require("mongoose");

// const PostsModel = mongoose.model(
//     "projetFinal",
//     {
//         auteur: {
//             type: String,
//             required: true
//         },
//         userId: {
//             type: String,
//         },
//         message: {
//             type: String,
//             required: true
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         }
//     },
//     "messages"
// )

const postsSchema = new mongoose.Schema(
    {
        auteur: {
            type: String,
            required: true
        },
        userId: {
            type: String,
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

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

// Méthode pour renvoyer l'ObjectId en id.
postsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


// "message" sera la collection dans laquelle sera stockee les donnees (+ un 's' a la fin: messages)
const PostsModel = mongoose.model("message", postsSchema);


module.exports = { PostsModel };