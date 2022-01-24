const express = require('express');
const router = express.Router();
// Module de controle de profils
const profilController = require('../controllers/profil.controller');


/********************************************* 
*************** Identification ***************
**********************************************/

// Authentification
router.post('/identification/connection', profilController.signIn);

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