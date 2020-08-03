import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'A test Recipe',
            'This is a simply a test', 
            'https://cdn5.recetasdeescandalo.com/wp-content/uploads/2017/03/Empanada-de-atun-con-masa-de-hojaldre-receta-facil.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('fuet', 40) 
                
            ]),
        new Recipe('Another Recipe',
        'This is an another test', 
        'https://cdn5.recetasdeescandalo.com/wp-content/uploads/2017/03/Empanada-de-atun-con-masa-de-hojaldre-receta-facil.jpg',
            [
                new Ingredient('Atun', 5),
                new Ingredient('Queso', 20)
            ])
      ];

      constructor( private slService: ShoppingListService){}

    
    setRecipes( recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }  
    getRecipe(){
        return this.recipes.slice();
    }
    
    getRcp(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe:Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}