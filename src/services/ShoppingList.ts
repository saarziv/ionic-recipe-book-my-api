import {Injectable} from "@angular/core";
import {Ingredient } from "../models/Ingredient";
// import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import "rxjs/add/operator/do";


@Injectable()
export class ShoppingListService {
  // url: string = "https://ionic-recipe-book-c1f42.firebaseio.com";
  private purchases:Ingredient[] = [];

  constructor(private httpClient:HttpClient){}

  addPurchase (name:string,amount:number): void {
    if(!this.purchases) {
      this.purchases = [];
    }
    this.purchases.push(new Ingredient(name,amount));
  }

  addMultiplePurchases(purchases:Ingredient[]) {
   this.purchases.push(...purchases);
  //  the seprator (...) deconsturct the array and  adds each element to the array.
  }
  removePurchaseByIndex (index:number) {
    this.purchases.splice(index,1);
  }
  removePurchase (purchase:Ingredient): void {
    let Pindex = this.purchases.findIndex((p) => p === purchase);
    this.removePurchaseByIndex(Pindex);
  }

  getPurchases () :Ingredient[] {
    return this.purchases;
  }

  // storeListFireBase(token: string,uid: string): Observable<any> {
  //   return this.httpClient
  //     .put(`${this.url}/${uid}/ShoppingList.json?auth=${token}`,this.purchases)
  // }

  // loadListFireBase(token: string,uid: string) {
  //   return this.httpClient
  //     .get(`${this.url}/${uid}/ShoppingList.json?auth=${token}`)
  //     .do((list: Ingredient[]) => {
  //       this.purchases = list;
  //     });
  // }

  loadTodos() {
    const link = "https://tranquil-refuge-58730.herokuapp.com";
    const xAuth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTdmMjEwNzJmZjQwNTAwMTQzYjA1ZjciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE4MjgwOTY3fQ.P5zcrnAj9uI48yF7b3-VeNjR09RkAh4DoLsBj_cetsg";
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      // 'Access-Control-Allow-Credentials': 'true',
        'x-auth': xAuth
    });

    return this.httpClient.get(`${link}/todos`,{headers:headers})
  }
}
