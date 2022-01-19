const express = require('express');
const router = express.Router();
// Module de controle de posts
const postsController = require('../controllers/posts.controller');


// Voir tous les posts
router.get('/', postsController.getAllPosts);

// Créer un post
router.post('/', postsController.createPost);

//Update / Mise a jour
// router.put("/:id", );

// Suppression
// router.delete("/:id", )

module.exports = router