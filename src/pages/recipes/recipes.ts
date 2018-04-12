import { Component } from '@angular/core';
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {AlertController, LoadingController, PopoverController} from "ionic-angular";
import {Authservice} from "../../services/authservice";
import {SlOptions} from "../SlOption/slOptions";
import {Ingredient} from "../../models/Ingredient";


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipePage = RecipePage;
  editRecipePage =  EditRecipePage;
  recipes:Recipe[];
  slOption = SlOptions;

  constructor(private recipeService:RecipesService,
              private popOverCtrl:PopoverController,
              private authService:Authservice,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController){}

  ionViewWillEnter () {
    this.recipes = this.recipeService.getRecipes();
  }

  loadPopOver(event: MouseEvent) {
    let popOver = this.popOverCtrl.create(this.slOption);
    popOver.present({ev: event});
    popOver.onDidDismiss((input) => {

      let currentUser = this.authService.getActiveUser();
      this.handleInput(currentUser,input);
    })
  }

  async handleInput(currentUser: any,input) {
    let token: string =  await currentUser.getIdToken();

    if(!input) {
      return;
    }
    if(input.action === 'load') {

      const loader = this.loadingCtrl.create({
        content: "Loading shopping list...",
      });
      loader.present();

      // this.recipeService.loadRecipeFireBase(token,currentUser.uid)
      //   .subscribe((list: Recipe[]) => {
      //     this.recipes = list;
      //     loader.dismiss();
      //   },(e) => {
      //     this.errorHandler(e);
      //   })
    } else {

      let loader = this.loadingCtrl.create({
        content: "Saving shopping list...",
        spinner: "crescent"
      });
      loader.present();

      // this.recipeService.storeRecipeFireBase(token,currentUser.uid)
      //   .subscribe((d) => {
      //     loader.dismiss();
      //   },(e) => {
      //     this.errorHandler(e);
      //   });
    }
  }

  errorHandler(e) {
    const alert = this.alertCtrl.create({
      title:"Error",
      message:e.message,
      buttons:['Ok']
    });
    alert.present();
  }


}
