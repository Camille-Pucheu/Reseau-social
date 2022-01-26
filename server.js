const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('./config/db');

// Modules de routes
const accueilRoutes = require('./routes/accueil.routes');
const profilRoutes = require('./routes/profils.routes');
const rechercheRoutes = require('./routes/recherche.routes');

const PORT = process.env.PORT || 5500;

var corsOptions = {
    // origin: "http://localhost:8081"
    origin: "https://projet-final-devjs.herokuapp.com"
  };

app.use(cors(corsOptions));

//Verifier si message d'erreur node
// const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

// Pour la lecture des req et res
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Relier le front Angular
app.use(express.static(path.join(__dirname + '/Front-End/dist/my-app')))

app.get('/', cors(corsOptions), function (req,res) {
    // res.json({ message: "Test" });
    res.sendFile(path.join(__dirname + '/Front-End/dist/my-app/index.html'));
})

//Page accueuil
app.use('/accueil', cors(corsOptions), accueilRoutes);

//Page recherche
app.use('/recherche', cors(corsOptions), rechercheRoutes);

//Page messages
// app.use('/messagerie', )

//Page profil
app.use('/profil', cors(corsOptions), profilRoutes);


app.listen(PORT, () => {
    console.log(`Demarrage sur le port ${PORT}`);
})