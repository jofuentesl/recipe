import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
  })

export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;



    constructor( private authService: AuthService, private router: Router){}

    onLoginMode () {
        this.isLoginMode = !this.isLoginMode;
        console.log(this.isLoginMode);
    }

    onSubmit(form: NgForm) {
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        
        let authObser : Observable<AuthResponseData>

        this.isLoading = true;
        
        if( this.isLoginMode ){
            authObser = this.authService.onLogin(email, password);
           
        } else {
            
            authObser = this.authService.onSignUp(email, password)
            
        }
        authObser.subscribe( resData => {
            console.log(resData);
            
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            
            }, 
        errorMessage => { 
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading= false;
            
            }
        );

        form.reset();
    }


}