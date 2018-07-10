import * as firebase from 'firebase'
import { Subject } from 'rxjs';

export class AuthService {
    userLogged = new Subject<boolean>()

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.userLogged.next(true)
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    loginUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            () => {
                this.userLogged.next(true)
            }
        )
    }

    logout() {
        this.userLogged.next(false)
    }
}