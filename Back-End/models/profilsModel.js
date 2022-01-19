const mongoose = require('mongoose');
// Bibliotheque pour verifier si un email est valide
const { isEmail } = require('validator');
// Bibliotheque de cryptage
const bcrypt = require('bcrypt');

const profilSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      // trim = suppression des espaces en debut et fin de chaine
      trim: true
    },
    email: {
      type: String,
      required: true,
      // verifier si l'email est valide
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // max tres haut pour prendre en compte le cryptage
      max: 1024,
      minlength: 6
    },
    prenom: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
    },
    nom: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
    },
    genre: {
        type: String
    },
    birthDate: {
        type: Date,
    },
    rue: {
        type: String,
    },
    codePostal: {
        type: String,
    },
    ville: {
        type: String,
    },
    photo: {
      type: String,
      default: "./assets/img/icons/profil.png"
    },
    presentation :{
      type: String,
      max: 1024,
    },
    preferences :{
      type: String,
      max: 1024,
    },
    amis: {
      type: [String]
    }
  },
  // Pour indiquer la date de creation du profil et sa date de modification 
  {
    timestamps: true,
  }
);


// Méthode pour renvoyer l'ObjectId en id.
profilSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


// Pour le cryptage du password
// 'pre' lance la fonction avant de save le schema
// 'next' lance la suite (donc le save)
// profilSchema.pre("save", async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// })


// "profil" sera la collection dans laquelle sera stockee les donnees (+ un 's' a la fin: profils)
const ProfilsModel = mongoose.model("profil", profilSchema);

module.exports = { ProfilsModel };