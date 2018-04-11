import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/Ingredient";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";


@Injectable()
export class RecipesService {
  recipes:Recipe[] = [];
  url: string = "https://ionic-recipe-book-c1f42.firebaseio.com";
  constructor(private httpClient:HttpClient){}

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  addRecipe(title:string,
            description:string,
            difficulty:string,
            ingredientList:Ingredient[]): void {
    if(!this.recipes) {
      this.recipes = []
    }
    this.recipes.push(new Recipe(title,description,difficulty,ingredientList));
  }

  updateRecipe(index:number,
               title:string,
               description:string,
               difficulty:string,
               ingredientList:Ingredient[]) {
    this.recipes[index] = new Recipe(title,description,difficulty,ingredientList);
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
  }

  storeRecipeFireBase(token: string,uid: string): Observable<any> {
    return this.httpClient
      .put(`${this.url}/${uid}/recipes.json?auth=${token}`,this.recipes)
  }

  loadRecipeFireBase(token: string,uid: string) {
    return this.httpClient
      .get(`${this.url}/${uid}/recipes.json?auth=${token}`)
      .do((recipes: Recipe[]) => {
        if(recipes) {
          this.recipes = recipes;
          this.recipes.forEach((r) => {
            if(!r.hasOwnProperty('ingredients')){
              r.ingredients = [];
            }
          })
        } else {
          this.recipes = [];
        }
      });
  }


}
