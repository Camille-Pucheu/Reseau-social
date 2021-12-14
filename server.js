const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
require('./config/db');
const postsRoutes = require('./routes/postsController');
const profilRoutes = require('./routes/profils.routes');

const PORT = process.env.PORT || 5500;

//Verifier si message d'erreur node
// const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

// Pour la lecture des req et res
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Relier le front Angular
app.use(express.static(path.join(__dirname + '/public/dist/my-app')))

app.use('/chicon', function (req,res) {
    res.sendFile(path.join(__dirname + '/public/dist/my-app/index.html'));
    console.log(path.join(__dirname + '/public/dist/my-app/index.html'));
})

//Page accueuil
app.use('/accueuil', postsRoutes);

//Page profil
app.use('/profil', profilRoutes);


app.listen(PORT, () => {
    console.log(`Demarrage sur le port ${PORT}`);
})