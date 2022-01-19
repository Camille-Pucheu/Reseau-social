import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/********* Service,s *********/
import { AuthentificationService } from '../../../services/authentification.service';
import { ProfilService } from '../../../services/profil.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  boutonConnectionActif = true;
  boutonInscriptionActif = false;

  userForm: FormGroup | any;

  userId : User[] = [];
  newUserId: any = undefined;

  erreurConnection = false;

  constructor(private authentificationService: AuthentificationService, 
              private router: Router,
              private formBuilder: FormBuilder,
              private profilService: ProfilService) { }

              
  ngOnInit(): void {
    if (this.authentificationService.idUtilisateurConnecte !== 'connection') {
      this.renvoiVersProfil(this.authentificationService.idUtilisateurConnecte, this.authentificationService.pseudoUtilisateurConnecte);
    }
    this.initForm();
  }
  
/********************************************* 
*************** Boutons actifs ***************
**********************************************/

  onConnectionForm() {
    // this.router.navigate([`profil/connection`])
    this.boutonConnectionActif = true;
    this.boutonInscriptionActif = false;
  }
  
  onInscriptionForm() {
    // this.router.navigate([`profil/inscription`])
    this.boutonConnectionActif = false;
    this.boutonInscriptionActif = true;
    console.log(this.boutonInscriptionActif)
  }

  
  /********************************************* 
   ***************** Connection *****************
   **********************************************/
  
  onSubmit(form: NgForm) {
    this.erreurConnection = true;
    this.interrogeLeServeur(form.value);
  }
  

  interrogeLeServeur(formData: any) {
    const data = formData;
    this.profilService
      .authentification(data)
      .subscribe({
        next: (res) => {
          this.userId = res;
          this.renvoiVersProfil(this.userId[0].id, this.userId[0].pseudo)
        },
        error: (e) => console.error(e)
      });
  }

  renvoiVersProfil (id: any, pseudo: string|undefined) {
    const newIdUrl = 'profil/' + id;
    this.authentificationService.connection(id, pseudo).then( () => {
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
          this.newUserId = res.id;
          this.renvoiVersProfil(this.newUserId, res.pseudo)
        },
        error: (e) => console.error(e)
      });
  }
  
}
