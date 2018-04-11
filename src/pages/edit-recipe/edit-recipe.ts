import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';

import {AbstractControl, FormArray, FormControl, FormGroup, Validators,} from "@angular/forms";
import {RecipesService} from "../../services/recipes";
import {Ingredient} from "../../models/Ingredient";
import {Recipe} from "../../models/recipe";



@Component({
  selector: 'page-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode = "New";
  index:number;
  recipe:Recipe;
  formGroup:FormGroup;

  constructor(private navParams:NavParams
              ,private actionSheetCtrl:ActionSheetController
              ,private alertCtrl:AlertController
              ,private toastCtrl:ToastController
              ,private recipesService:RecipesService
              ,private navCtrl:NavController
  ){}

  ngOnInit() {
    let pageMode = this.navParams.get('mode');

    if (pageMode === 'Edit') {
      this.mode = pageMode;
      this.index = this.navParams.get('index');
      this.recipe = this.navParams.get('recipe');
    }
    this.initializeFormGroup();
  }


  initializeFormGroup() {
    let title: string = null;
    let description: string = null;
    let difficulty: string = 'Medium';
    let ingredients  = [];

    if(this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;

      if(this.recipe.ingredients){
        this.recipe.ingredients.forEach((ing) => {
          ingredients.push(new FormControl(ing.name,Validators.required))
        })
      }
    }

    this.formGroup = new FormGroup({
      'title': new FormControl(title,Validators.required),
      'description': new FormControl(description,Validators.required),
      'difficulty': new FormControl(difficulty,Validators.required),
      'ingredientsList': new FormArray(ingredients)
    });

  }



  onSubmit() {

    const value = this.formGroup.value;
    let ingredientsList: Ingredient[] = [];

    if(value.ingredientsList.length > 0){

      ingredientsList = value.ingredientsList
        .map( (ing) => new Ingredient(ing,1));
    }

    if(this.mode === 'New') {
      this.recipesService.addRecipe(value.title,
        value.description,
        value.difficulty,
        ingredientsList);

      const toastRecipeAdded = this.toastCtrl.create({
        message: `Recipe ${value.title} has been added to the recipe list.`,
        duration: 1500,
        position: 'bottom'
      });
      toastRecipeAdded.present();
    } else {
      this.recipesService.updateRecipe(this.index,value.title,
        value.description,
        value.difficulty,
        ingredientsList);

      const toastRecipeUpdated= this.toastCtrl.create({
        message: `Recipe ${value.title} has been successfully updated !`,
        duration: 1500,
        position: 'bottom'
      });

      toastRecipeUpdated.present();
    }

    this.formGroup.reset();
    this.navCtrl.popToRoot();

  }

  onManageIngredients() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.onAddIngredient();
          }
        },
        {
          text: 'Remove All Ingredients',
          role:'destructive',
          handler: () => {
            this.onRemoveAllIngredients();
          }
        },
        {
          text: 'cancel',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  onAddIngredient() {
    let alert = this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name:'name',
          placeholder:'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (input) => {
            if(input.name.trim() == '' || input.name == null) {
              const toastInvalid = this.toastCtrl.create({
                message: "Please enter a valid name.",
                duration: 1500,
                position: 'bottom'
              });
              toastInvalid.present();
              return;
            }

            (<FormArray>this.formGroup.get('ingredientsList'))
              .push(new FormControl(input.name));

            const toastValid = this.toastCtrl.create({
              message: `Ingredient ${input.name} was added successfully.`,
              duration: 1500,
              position: 'bottom'
            });
            toastValid.present();
          }
        }
      ]
    });
    alert.present();
  }


  onRemoveAllIngredients() {
    const fArray: FormArray=  <FormArray>this.formGroup.get('ingredientsList');
    for(let i = fArray.length-1; i>=0;i--) {
      fArray.removeAt(i);
    }
    const toastRemoved = this.toastCtrl.create({
      message: "All Ingredients have been removed.",
      duration: 1500,
      position: 'bottom'
    });
    toastRemoved.present();
  }


}
