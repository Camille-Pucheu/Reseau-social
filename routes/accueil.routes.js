const express = require('express');
const router = express.Router();
// Module de controle de posts
const postsController = require('../controllers/posts.controller');

const cors = require('cors');
var corsOptions = {
    // origin: "http://localhost:8081"
    origin: "https://projet-final-devjs.herokuapp.com/accueil"
  };

// router.use(cors(corsOptions));


// Voir tous les posts
router.get('/', postsController.getAllPosts);

// Créer un post
router.post('/', postsController.createPost);

//Update / Mise a jour
// router.put("/:id", );

// Suppression
// router.delete("/:id", )

module.exports = router