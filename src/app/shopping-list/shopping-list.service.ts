import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

    ingredientChange = new Subject<Ingredient[]>();
    startedEditing   = new Subject<number>(); 
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannas', 10)
      ];    

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }   

    addNewIngredient( ingredient: Ingredient ){
        this.ingredients.push(ingredient);
        this.ingredientChange.next(this.ingredients.slice());
    }

    addIngredients( ingredients: Ingredient[] ){
        this.ingredients.push(...ingredients);
        this.ingredientChange.next(this.ingredients.slice());
    }

    updateIgredient(index: number, newIngredient : Ingredient){
        this.ingredients[index] = newIngredient; 
        this.ingredientChange.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChange.next(this.ingredients.slice());
    }
}