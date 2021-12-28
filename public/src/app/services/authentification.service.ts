export class AuthentificationService {

    authentification = false;

    connection () {
        return new Promise(
            (resolve, rejects) => {
                this.authentification = true;
                resolve(true);
            }
        )
    }

    deconnection () {
        this.authentification = false;
    }
}