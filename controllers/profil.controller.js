const { ProfilsModel } = require("../models/profilsModel");
const { PostsModel } = require("../models/postsModel");
// Pour verifier/controler les id connus
const ObjectID = require("mongoose").Types.ObjectId;



// Obtenir des utilisateurs
module.exports.getAllUsers = async (req, res) => {

    // Recherche par pseudo
    if (req.query.pseudo) {
        const pseudoSearch = req.query.pseudo;
        ProfilsModel.find({ pseudo: { $regex: new RegExp(pseudoSearch), $options: "i" } }, function (err, docs) {
            if (!docs){
                res.send('err');
            }
            else {
                res.status(200).send(docs);
            }
        })
    // Recherche par prenom
    } else if (req.query.prenom) {
        const prenomSearch = req.query.prenom;
        ProfilsModel.find({prenom: { $regex: new RegExp(prenomSearch), $options: "i" } }, function (err, docs) {
            if (!docs){
                res.send('err');
            }
            else {
                res.status(200).send(docs);
            }
        })
    // Recherche par nom
    } else if (req.query.nom) {
        const nomSearch = req.query.nom;
        ProfilsModel.find({nom: { $regex: new RegExp(nomSearch), $options: "i" } }, function (err, docs) {
            if (!docs){
                res.send('err');
            }
            else {
                res.status(200).send(docs);
            }
        })
    // Tous les utilisateurs
    } else {
        const users = await ProfilsModel.find().select("-password");
        res.status(200).send(users);
    }
    
};


// Obtenir les infos d'un seul utilisateur
module.exports.userInfo = (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send(`Utilisateur ${id} non reconnu`);
    }
    else {
        ProfilsModel.findById(id, function (err, profilData) {
            if (err){
                console.log("ID non reconnu, erreur :" + err);
            }
            else {
                PostsModel.find({userId: id}, function (err, postsData) {
                    if (!postsData){
                        res.send(err);
                    }
                    else {
                        const datas = [profilData, postsData]
                        res.status(200).send(datas);
                    }
                }).sort({ 'date' : -1});
            }
        }).select("-password");
    };
};

// Authentification
// Recherche par Pseudo et Password
module.exports.signIn = async (req, res) => {
    const authPseudo = req.body.pseudo;
    const authPassword = req.body.password

    ProfilsModel.find({pseudo: authPseudo, password: authPassword}, function (err, docs) {
        if (!docs){
            res.send('erreur');
        }
        else {
            res.status(200).send(docs);
        }
    })
    
}

// Créer un utilisateur
module.exports.createUser = (req, res) => {
    // Créer un nouveau profil
    const newUser = new ProfilsModel({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
        prenom: req.body.prenom,
        nom: req.body.nom,
        genre: req.body.genre ? req.body.genre : undefined,
        birthDate: req.body.birthDate ? req.body.birthDate : undefined,
        rue: req.body.rue ? req.body.rue : undefined,
        codePostal: req.body.codePostal ? req.body.codePostal : undefined,
        ville: req.body.ville ? req.body.ville : undefined,
        presentation: req.body.presentation ? req.body.presentation : undefined,
        preferences: req.body.preferences ? req.body.preferences : undefined,
    });
    
    // Sauvegarder le nouveau profil dans la base de donnée
    newUser.save((err,docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Erreur de newUser : ' + err);
            res.send(err)
        }
    })
}


// module.exports.updateUser = async (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//           message: "Data to update can not be empty!"
//         });
//       }
    
//       const id = req.params.id;
    
//       Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//           if (!data) {
//             res.status(404).send({
//               message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//             });
//           } else res.send({ message: "Tutorial was updated successfully." });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message: "Error updating Tutorial with id=" + id
//           });
//         });
// }

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Utilisateur ${req.params.id} non reconnu`);
    }
    try {
        await ProfilsModel.findByIdAndDelete(req.params.id).exec();
        res.status(200).send({ message: "Profil supprimé" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};


// Rechercher un utilisateur
// Par pseudo, prenom ou nom
module.exports.searchUser = (req, res) => {
    console.log('req.params = ', req.params);
    console.log('req.body = ', req.body);
    console.log('req.params.findBy = ', req.params.findBy);
    // console.log(req.body);
    // console.log(req.query);
    const userSearch = req.body.search;
    const userFindBy = req.body.findBy;
    // console.log('userSearch, userFindBy = ',userSearch, userFindBy);

    ProfilsModel.find({userFindBy: userSearch}, function (err, docs) {
        if (!docs){
            res.send('erreur');
        }
        else {
            res.status(200).send(docs);
        }
    })
    
}