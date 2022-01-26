const express = require('express');
const router = express.Router();
// Module de controle de profils
const profilController = require('../controllers/profil.controller');
const cors = require('cors');
var corsOptions = {
    // origin: "http://localhost:8081"
    origin: "http://localhost:5500/profil"
    // origin: "https://projet-final-devjs.herokuapp.com/profil"
  };
  const path = require('path');

// app.use(cors(corsOptions));

/********************************************* 
*************** Identification ***************
**********************************************/

// Authentification
router.post('/identification/connexion', profilController.signIn);

// Création d'un utilisateur
router.post('/identification/inscription', profilController.createUser);

/********************************************* 
*********** Consultation de profil ***********
**********************************************/

// Consulter son profil
router.get('/:id', profilController.userInfo);

// router.get('/:id', [profilController.userInfo, postsController.userPosts]);

/********************************************** 
*********** Modification de profil ************
**********************************************/

// Modifier un utilisateur
// router.put('/:id', profilController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', profilController.deleteUser);


module.exports = router;