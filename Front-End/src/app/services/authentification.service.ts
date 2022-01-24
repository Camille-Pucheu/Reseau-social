export class AuthentificationService {

    authentification = false;

    idUtilisateurConnecte = 'connection';
    pseudoUtilisateurConnecte: string | undefined = '';
    administrateur = false;

    connection (id: string, pseudo: string|undefined) {
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

    deconnection () {
        this.authentification = false;
        this.idUtilisateurConnecte = 'connection';
        this.pseudoUtilisateurConnecte = '';
        this.administrateur = false;
    }
}