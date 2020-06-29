import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {

    ingredientChange = new EventEmitter<Ingredient[]>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannas', 10)
      ];    

   

    getIngredients(){
        return this.ingredients.slice();
    }

    addNewIngredient( ingredient: Ingredient ){
        this.ingredients.push(ingredient);
        this.ingredientChange.emit(this.ingredients.slice());
    }

    addIngredients( ingredients: Ingredient[] ){
        this.ingredients.push(...ingredients);
        this.ingredientChange.emit(this.ingredients.slice());
    }
}