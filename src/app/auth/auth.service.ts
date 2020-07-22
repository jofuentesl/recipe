import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

interface SignInResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean   
}
@Injectable({providedIn: "root"})

export class AuthService {

    constructor( private http: HttpClient ){}

    onSignUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDghCS__gIKWcvBokLLl__C-SbccVHyPYg',
            {
                email : email,
                password : password,
                returnSecureToken: true
            }
        );
    }

    onLogin(email: string, password: string ) {
        return this.http.post<SignInResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDghCS__gIKWcvBokLLl__C-SbccVHyPYg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}