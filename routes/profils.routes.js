const express = require('express');
const router = express.Router();
// Module d'authentification
const authController = require('../controllers/auth.controller');
// Module de modification de profil
const profilController = require('../controllers/profil.controller');

// Authentification
router.post('/register', authController.signUp);

/********************************************** 
***** Consultation/Modification de profil *****
**********************************************/
// Obtenir tous les utilisateurs
router.get('/', profilController.getAllUsers);
// Obtenir les infos d'un seul utilisateur
router.get('/:id', profilController.userInfo);
// Supprimer un utilisateur
router.delete('/:id', profilController.deleteUser);


module.exports = router;