import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
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
    getRecipe(){
        return this.recipes.slice();
    }
    
    getRcp(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}