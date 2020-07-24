import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    resistered?: boolean
}

@Injectable({providedIn: "root"})

export class AuthService {

    user = new Subject<User>();

    constructor( private http: HttpClient ){}

    onSignUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDghCS__gIKWcvBokLLl__C-SbccVHyPYg',
            {
                email : email,
                password : password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handelError), 
        tap(resData => {

            this.handelAuth (resData.email, resData.localId, resData.idToken, +resData.expiresIn );
    
        }));
    }

    onLogin(email: string, password: string ) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDghCS__gIKWcvBokLLl__C-SbccVHyPYg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handelError),
        tap(resData => {

            this.handelAuth (resData.email, resData.localId, resData.idToken, +resData.expiresIn );
    
        }));
    }
    private handelAuth (email: string, id: string, token: string, experation: number ) {

        const experationDate = new Date( 
            new Date().getTime()+ experation * 1000);
        const user = new User(
            email, 
            id, 
            token, 
            experationDate);
        this.user.next(user);

    }

    private handelError(errorResp: HttpErrorResponse) {
        let errorMessage = 'And unknow error occurred!';
        if(!errorResp.error || !errorResp.error.error){
            return throwError(errorMessage);
            }
        switch(errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;         
            }
            console.log('hola');   
            return throwError(errorMessage);
          
        }
}