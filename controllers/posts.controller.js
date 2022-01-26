// Recuperation de l'id d'un message
const ObjectID = require('mongoose').Types.ObjectId;
// Modèle
const { PostsModel } = require('../models/postsModel');


// Voir tous les posts
module.exports.getAllPosts = async (req, res) => {
    PostsModel.find( (err, docs) => {
        if (!err) {
            // console.log('docs router : ' + docs);
            res.status(200).send(docs).sendFile(path.join(__dirname + '/Front-End/dist/my-app/index.html'));
        } else {
            console.log('erreur router: ' + err);
        }
    }).sort({ 'date' : -1});
}

// Voir les posts d'un utilisateur
module.exports.userPosts = (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send(`Utilisateur ${id} non reconnu`).sendFile(path.join(__dirname + '/Front-End/dist/my-app/index.html'));
    }
    else {
        PostsModel.find({userId: id}, function (err, docs) {
            if (!docs){
                res.send('erreur');
            }
            else {
                res.status(200).send(docs).sendFile(path.join(__dirname + '/Front-End/dist/my-app/index.html'));

            }
        }).sort({ 'date' : -1});
    }
};


// Créer un post
module.exports.createPost = (req, res) => {
    const newPost = new PostsModel({
        auteur: req.body.auteur,
        userId: req.body.userId,
        message: req.body.message
    });

    newPost.save((err,docs) => {
        if (!err) {
            res.send(docs).sendFile(path.join(__dirname + '/Front-End/dist/my-app/index.html'));
        } else {
            console.log('Erreur de newPost : ' + err);
        }
    })
};

// Update / Mise a jour d'un post
module.exports.updatePost = (req, res) => {
    //Verifie si l'ID est inconnu
    if (!ObjetID.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id);
    }

    //si l'ID est connu
    const updatePost = {
        auteur: req.body.auteur,
        message: req.body.message
    }

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatePost },
        { new: true},
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log('Erreur mise a jour : ' + err);
            }
        }
    )
};


// Suppression d'un post
module.exports.deletePost = (req, res) => {
    //Verifie si l'ID est inconnu
    if (!ObjetID.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id)
    }
    PostsModel.findOneAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log('Erreur de suppression : ' + err);
            }
        }
    )
};
