import {  Component, 
          OnInit, 
          OnDestroy,
          ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';          

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f', {static:false}) slForm: NgForm;

  subcription : Subscription;
  editMode: boolean = false;
  editNumberItem: number;
  editedItem: Ingredient;

  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slService.startedEditing
      .subscribe( (index: number) => {
        this.editNumberItem = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);  
        this.slForm.setValue({
          name   : this.editedItem.name,
          amount : this.editedItem.amount 
        })

      });
  }
  
  onSubmit(form: NgForm ){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIgredient(this.editNumberItem, newIngredient);
    } else {
      this.slService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editNumberItem);
    this.onClear();
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
}
