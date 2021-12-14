const ProfilsModel = require("../models/profilsModel");
// Pour verifier/controler les id connus
const ObjectID = require("mongoose").Types.ObjectId;


// Obtenir tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await ProfilsModel.find().select("-password");
    res.status(200).json(users);
  };


// Obtenir les infos d'un seul utilisateur
module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Utilisateur ${req.params.id} non reconnu`);
    }
    else {
        ProfilsModel.findById(req.params.id,function (err, docs) {
            if (err){
                console.log("ID non reconnu, erreur :" + err);
            }
            else {
                res.send(docs);
            }
        }).select("-password");
    }
};

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Utilisateur ${req.params.id} non reconnu`);
    }
    try {
        await ProfilsModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send({ message: "Profil supprimé" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};