import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/********* Service,s *********/
import { AuthentificationService } from '../../../services/authentification.service';
import { ProfilService } from '../../../services/profil.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit, OnChanges {

  userForm: FormGroup | any;
  newUserId: any = undefined;
  @Input() profilConnecte: object = {};
  profil: User = {
    pseudo : '',
    email: '',
    prenom : '',
    nom : '',
    genre : '',
    birthDate : '',
    rue : '',
    codePostal : '',
    ville : '',
    presentation : '',
    preferences : '',
    amis : [],
    createdAt : undefined
  }


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authentificationService: AuthentificationService,
              private profilService: ProfilService) { }

  ngOnInit(): void {
    if (this.authentificationService.idUtilisateurConnecte !== 'connexion') {
      this.renvoiVersProfil(this.authentificationService.idUtilisateurConnecte, this.authentificationService.pseudoUtilisateurConnecte);
    }
    this.initForm();
  }

  ngOnChanges(): void {
      this.profil = this.profilConnecte;
  }

  renvoiVersProfil (id: any, pseudo: string|undefined) {
    const newIdUrl = 'profil/' + id;
    this.authentificationService.connexion(id, pseudo).then( () => {
      this.router.navigate([newIdUrl]);
    } )
  }

/********************************************* 
**************** Inscription *****************
**********************************************/

  initForm () {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
      prenom: ['', Validators.required ],
      nom: ['', Validators.required ],
      genre: '',
      birthDate: '',
      rue: '',
      codePostal: '',
      ville: '',
      presentation: '',
      preferences: '',
    })
  }

  onSubmitForm () {
    const formValue = this.userForm.value;
    this.profilService
      .creationDeProfil(formValue)
      .subscribe({
        next: (res) => {
          this.filtre(res);
        },
        error: (e) => {
          console.log('error de creation profil = ', e);
          console.error(e);
        }
      });
  }

/********************************************* 
*********** Gestions des erreurs *************
**********************************************/

  invalidInscription = {
    pseudoExistant: false,
    minPseudo: false,
    maxPseudo: false,
    emailExistant: false,
    invalidEmail: false,
    minPassword : false,
    minPrenom: false,
    maxPrenom: false,
    minNom: false,
    maxNom: false,
    maxPresentation: false,
    maxPreferences: false,
    invalidForm: false,
  };

  initInvalidInscription() {
    this.invalidInscription.pseudoExistant = false;
    this.invalidInscription.minPseudo = false;
    this.invalidInscription.maxPseudo = false;
    this.invalidInscription.emailExistant = false;
    this.invalidInscription.invalidEmail = false;
    this.invalidInscription.minPassword = false;
    this.invalidInscription.minPrenom = false;
    this.invalidInscription.maxPrenom = false;
    this.invalidInscription.minNom = false;
    this.invalidInscription.maxNom = false;
    this.invalidInscription.maxPresentation = false;
    this.invalidInscription.maxPreferences = false;
    this.invalidInscription.invalidForm = false;
  }

  filtre(data: any) {
    if (data.errors) {
      if (data.errors.pseudo) {
        if (data.errors.pseudo.kind == "minlength") {
          this.initInvalidInscription();
          this.invalidInscription.minPseudo = true;
          this.invalidInscription.invalidForm = true;
        } else if (data.errors.pseudo.kind == "maxlength") {
          this.initInvalidInscription();
          this.invalidInscription.maxPseudo = true;
          this.invalidInscription.invalidForm = true;
        }
      } else if (data.errors.email) {
        this.initInvalidInscription();
        this.invalidInscription.invalidEmail = true;
        this.invalidInscription.invalidForm = true;
      } else if (data.errors.password) {
        this.initInvalidInscription();
        this.invalidInscription.minPassword = true;
        this.invalidInscription.invalidForm = true;
      } else if (data.errors.prenom) {
        if (data.errors.prenom.kind == "minlength") {
          this.initInvalidInscription();
          this.invalidInscription.minPrenom = true;
          this.invalidInscription.invalidForm = true;
        } else if (data.errors.prenom.kind == "maxlength") {
          this.initInvalidInscription();
          this.invalidInscription.maxPrenom = true;
          this.invalidInscription.invalidForm = true;
        }
      } else if (data.errors.nom) {
        if (data.errors.nom.kind == "minlength") {
          this.initInvalidInscription();
          this.invalidInscription.minNom = true;
          this.invalidInscription.invalidForm = true;
        } else if (data.errors.nom.kind == "maxlength") {
          this.initInvalidInscription();
          this.invalidInscription.maxNom = true;
          this.invalidInscription.invalidForm = true;
        }
      } else if (data.errors.presentation) {
        this.initInvalidInscription();
        this.invalidInscription.maxPresentation = true;
        this.invalidInscription.invalidForm = true;
      } else if (data.errors.preferences) {
        this.initInvalidInscription();
        this.invalidInscription.maxPreferences = true;
        this.invalidInscription.invalidForm = true;
      }
    } else if (data.keyPattern) {
      if (data.keyPattern.pseudo) {
        this.initInvalidInscription();
        this.invalidInscription.pseudoExistant = true;
        this.invalidInscription.invalidForm = true;
      } else if (data.keyPattern.email) {
        this.initInvalidInscription();
        this.invalidInscription.emailExistant = true;
        this.invalidInscription.invalidForm = true;
      }
    } else {
      this.newUserId = data.id;
      this.renvoiVersProfil(this.newUserId, data.pseudo)
    }
  }

}
