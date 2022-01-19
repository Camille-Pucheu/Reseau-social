const mongoose = require('mongoose');

mongoose
    .connect( 'mongodb+srv://CamilleP:Boubou@cluster0.wqozl.mongodb.net/projetFinal' )
    .then( () => console.log('Connection à MongoDB ok') )
    .catch( (err) => console.log("Connection à MongoDB a échoué" + err) )