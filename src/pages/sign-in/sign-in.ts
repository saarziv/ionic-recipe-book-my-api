import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {Authservice} from "../../services/authservice";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage {

  tabsPage:any = TabsPage;

  constructor(private navCtrl:NavController,private authService:Authservice,
              private loadingCtrl:LoadingController, private alertCtrl:AlertController){}

  onSignIn(form: FormGroup) {

    const loading = this.loadingCtrl.create({
      content: "Signing in...(Accessing server)",
      spinner: "crescent"
    });
    loading.present();

    this.authService.signInFireBase(form.value.email, form.value.password)
      .then((res) => {
        loading.dismiss();

      }).catch((e) => {
        loading.dismiss();

        const alertErr = this.alertCtrl.create({
          title:"Error",
          message:`${e.message}`,
          buttons:['Ok']
        });
        alertErr.present();
    });

  }
}
