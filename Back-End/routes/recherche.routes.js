const express = require('express');
const router = express.Router();
// Modules de contrôle
const profilController = require('../controllers/profil.controller');
const postsController = require('../controllers/posts.controller');


// Liste d'utilisateurs
// Tous ou par recherche de pseudo, prenom ou nom
router.get('/', profilController.getAllUsers);

// Consulter le profil d'un utilisateur
router.get('/:id', profilController.userInfo);

module.exports = router;