import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/ShoppingList";
import {Ingredient} from "../../models/Ingredient";
import {SlOptions} from "../SlOption/slOptions";
import {Authservice} from "../../services/authservice";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  purchases:Ingredient[];
  slOption =  SlOptions ;
  constructor(private shoppingList:ShoppingListService,
              private popOverCtrl:PopoverController,
              private authService:Authservice,
              private shoppingListService:ShoppingListService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  ionViewWillEnter() {
    this.purchases = this.shoppingList.getPurchases();
  }

  onAddItem(form:NgForm) {
    console.log(form);
    this.shoppingList.addPurchase(form.value.ingredientName,form.value.amount);
    console.log(this.shoppingList.getPurchases());
    form.reset();
  }
  onRemoveItem(index:number) {
    this.shoppingList.removePurchaseByIndex(index);
  }

  loadPopOver(event: MouseEvent) {
    let popOver = this.popOverCtrl.create(this.slOption);
    popOver.present({ev: event});
    popOver.onDidDismiss((input) => {

      let currentUser = this.authService.getActiveUser();
      this.handleInput(currentUser,input);
    })
  }

  async handleInput(currentUser,data) {
    let token: string =  await currentUser.getIdToken();

    if(!data) {
      return
    }
    if(data.action === 'load') {

      const loader = this.loadingCtrl.create({
        content: "Loading shopping list...",
      });
      loader.present();

      this.shoppingListService.loadListFireBase(token,currentUser.uid)
        .subscribe((list: Ingredient[]) => {
          if(list) {
            this.purchases = list;
          } else {
            this.purchases = [];
          }
          loader.dismiss();
        },(e) => {
          this.errorHandler(e);
        })
    } else {

      let loader = this.loadingCtrl.create({
        content: "Saving shopping list...",
        spinner: "crescent"
      });
      loader.present();

      this.shoppingListService.storeListFireBase(token,currentUser.uid)
        .subscribe((d) => {
          loader.dismiss();
        },(e) => {
          this.errorHandler(e);
        });
    }
  }

  errorHandler(e){
    const alert = this.alertCtrl.create({
      title:"Error",
      message:e.message,
      buttons:['Ok']
    });
    alert.present();
  }





}
