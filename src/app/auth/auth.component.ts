import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
  })

export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor( private authService: AuthService){}

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
        
        this.isLoading = true;
        
        if( this.isLoginMode ){
            this.authService.onLogin(email, password)
            .subscribe ( resData => {
                console.log(resData);
                this.isLoading = false;
            })
        } else {

            this.authService.onSignUp(email, password)
            .subscribe( resData => {
                console.log(resData);
                
                this.isLoading = false;
                
                }, 
            error => { 
                console.log(error);
                this.error = 'An error occurred!'
                this.isLoading= false;
                
                }
            );
        }

        form.reset();
    }


}