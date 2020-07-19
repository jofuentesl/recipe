import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';



@Injectable({ providedIn: 'root'})

export class DataStorageService {

    constructor( private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes(){
        const recipe = this.recipeService.getRecipe();
        this.http.put('https://cousine-b6d43.firebaseio.com/recipes.json', recipe)
        .subscribe( response => {
            console.log(response);
        });
    }

    getRecipes() {
        this.http.get('https://cousine-b6d43.firebaseio.com/recipes.json')
        .subscribe( 
            (response: Response) => {
                console.log(response);
            //const recipes: Recipe[] = response.json();
            //this.recipeService.setRecipes(recipes);
        });
    }
}