const express = require('express');
const router = express.Router();
// Modules de contrôle
const profilController = require('../controllers/profil.controller');
const postsController = require('../controllers/posts.controller');


// Obtenir tous les utilisateurs
router.get('/', profilController.getAllUsers);

// Consulter le profil d'un utilisateur
router.get('/:id', profilController.userInfo);

module.exports = router;