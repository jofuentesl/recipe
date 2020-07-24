import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredients: Ingredient[];
  private subIngri: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subIngri = this.slService.ingredientChange
    .subscribe( 
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  onEditItem(index: number) { 
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.subIngri.unsubscribe();
  }
}
