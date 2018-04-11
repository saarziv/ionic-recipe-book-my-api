import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Authservice} from "../../services/authservice";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(private authService:Authservice,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  onSignUp(form:FormGroup) {
    const loading = this.loadingCtrl.create({
      content:"Please wait...(Accessing server..)"
    });
    loading.present();
    this.authService.signUpFireBase(form.value.email,form.value.password)
      .then((res) => {
        loading.dismiss();
      })
      .catch((e) => {
        loading.dismiss();
        const alertError = this.alertCtrl.create({
          title:"Error",
          message:`${e.message}`,
          buttons:['Ok']
        });
        alertError.present();
      });
  }

}
