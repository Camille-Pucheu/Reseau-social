const express = require('express');
const router = express.Router();
// Module de controle de profils
const profilController = require('../controllers/profil.controller');
const cors = require('cors');
var corsOptions = {
    // origin: "http://localhost:8081"
    origin: "https://projet-final-devjs.herokuapp.com"
  };

// app.use(cors(corsOptions));

/********************************************* 
*************** Identification ***************
**********************************************/

// Authentification
router.post('/identification/connection', cors(corsOptions), profilController.signIn);

// Création d'un utilisateur
router.post('/identification/inscription', cors(corsOptions), profilController.createUser);

/********************************************* 
*********** Consultation de profil ***********
**********************************************/

// Consulter son profil
router.get('/:id', cors(corsOptions), profilController.userInfo);

// router.get('/:id', [profilController.userInfo, postsController.userPosts]);

/********************************************** 
*********** Modification de profil ************
**********************************************/

// Modifier un utilisateur
// router.put('/:id', profilController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', cors(corsOptions), profilController.deleteUser);


module.exports = router;