import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  recipeArray: Recipe[];

  constructor( private dataStorageService: DataStorageService) { }


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
  }

}
