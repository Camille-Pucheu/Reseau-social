const express = require('express');
const router = express.Router();
// recuperation de l'id d'un message
const ObjetID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
    PostsModel.find( (err, docs) => {
        if (!err) {
            console.log('docs router : ' + docs);
            res.send(docs)
        } else {
            console.log('erreur router: ' + err);
        }
    })
})

//Envoi de message
router.post('/', (req, res) => {
    const newPost = new PostsModel({
        auteur: req.body.auteur,
        message: req.body.message
    });

    newPost.save((err,docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Erreur de newPost : ' + err);
        }
    })
})

//Update / Mise a jour
router.put("/:id", (req, res) => {
    //Verifie si l'ID est inconnu
    if (!ObjetID.isValid(req.params.id)) {
        return res.status(400).send("ID inconnu : " + req.params.id)
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
});


// Suppression
router.delete("/:id", (req, res) => {
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
})

module.exports = router