import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from "ionic-angular";
import {Recipe} from "../../models/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/ShoppingList";
import {RecipesService} from "../../services/recipes";


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  editRecipe = EditRecipePage;
  recipe:Recipe;
  index:number;

  constructor(private navPrams:NavParams,
              private shoppingListService:ShoppingListService,
              private toastCtrl:ToastController,
              private recipeService:RecipesService,
              private navCtrl:NavController){}

  ngOnInit() {
    this.recipe = this.navPrams.data.recipe;
    this.index = this.navPrams.data.index;
  }

  onAddIngredient() {

    this.shoppingListService.addMultiplePurchases(this.recipe.ingredients);

    const toastAdded = this.toastCtrl.create({
      message:"the ingredients have been added successfully to your shopping list",
      duration: 1500,
      position: 'bottom'
    });
    toastAdded.present();

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
