import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

import { Recipe } from '../../recipes/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  recipeArray: Recipe[];
  private userSub: Subscription;
  isAuthenticated = false;

  constructor( 
    private dataStorageService: DataStorageService,
    private authService: AuthService ) { }


  onSaveData() {

    this.dataStorageService.storeRecipes();

  }

  onFetchData(){
    this.dataStorageService.getRecipes()
    .subscribe(res => {
      this.recipeArray = res;
      console.log(this.recipeArray)
    });
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
