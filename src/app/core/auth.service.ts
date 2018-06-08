import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { first, tap, switchMap} from 'rxjs/operators';
import { User } from "../model/user";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    user: Observable<User | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notify: NotifyService
    ) {
        this.user = this.getUser();
    }

    getUser() {
        return this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`album_users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    getUserData() {
        return this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`album_users/${user.uid}`).ref.get().then(doc=>{
                        if(doc.exists) return doc.data();
                        return null;
                    });
                } else {
                    return null;
                }
            })
        );
    }

    ////// OAuth Methods /////

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider: any) {
        return this.afAuth.auth
            .signInWithPopup(provider)
            .then(credential => {
                this.notify.update('Welcome to Album!!!', 'success');
                return this.updateUserData(credential.user);
            })
            .catch(error => this.handleError(error));
    }

    //// Anonymous Auth ////

    anonymousLogin() {
        return this.afAuth.auth
            .signInAnonymously()
            .then(credential => {
                this.notify.update('Welcome to Album!!!', 'success');
                return this.updateUserData(credential.user); // if using firestore
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    //// Email/Password Auth ////

    emailSignUp(email: string, password: string) {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(credential => {
                this.notify.update('Welcome to Album!!!', 'success');
                return this.updateUserData(credential.user); // if using firestore
            })
            .catch(error => this.handleError(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(credential => {
                this.notify.update('Welcome to Album!!!', 'success');
                this.router.navigate(['albums-list']);
                return this.updateUserData(credential.user);
            })
            .catch(error => this.handleError(error));
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth
            .sendPasswordResetEmail(email)
            .then(() => this.notify.update('Password update email sent', 'info'))
            .catch(error => this.handleError(error));
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

    // If error, console log and notify user
    private handleError(error: Error) {
        console.error(error);
        this.notify.update(error.message, 'error');
    }

    // Sets user data to firestore after succesful login
    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
            `album_users/${user.uid}`
        );

        const data: User = {
            uid: user.uid,
            email: user.email || null
        };

        return userRef.set(data, {merge: true});
    }

}
