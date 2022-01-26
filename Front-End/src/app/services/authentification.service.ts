export class AuthentificationService {

    authentification = false;

    idUtilisateurConnecte = 'connexion';
    pseudoUtilisateurConnecte: string | undefined = '';
    administrateur = false;

    connexion (id: string, pseudo: string|undefined) {
        return new Promise(
            (resolve, rejects) => {
                this.authentification = true;
                this.idUtilisateurConnecte = id;
                this.pseudoUtilisateurConnecte = pseudo;
                if (id == '61eade7172000ada2562e262') {
                    this.administrateur = true;
                }
                resolve(true);
            }
        )
    }

    deconnexion () {
        this.authentification = false;
        this.idUtilisateurConnecte = 'connexion';
        this.pseudoUtilisateurConnecte = '';
        this.administrateur = false;
    }
}