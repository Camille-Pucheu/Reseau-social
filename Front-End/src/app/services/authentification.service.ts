export class AuthentificationService {

    authentification = false;

    idUtilisateurConnecte = 'connection';
    pseudoUtilisateurConnecte: string | undefined = '';

    connection (id: string, pseudo: string|undefined) {
        return new Promise(
            (resolve, rejects) => {
                this.authentification = true;
                this.idUtilisateurConnecte = id;
                this.pseudoUtilisateurConnecte = pseudo;
                resolve(true);
            }
        )
    }

    deconnection () {
        this.authentification = false;
        this.idUtilisateurConnecte = 'connection';
        this.pseudoUtilisateurConnecte = '';
    }
}