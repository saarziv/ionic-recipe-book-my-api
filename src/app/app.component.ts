import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
// import firebase from "firebase";
import {Authservice} from "../services/authservice";

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {

  signInPage:any = SignInPage;
  signUpPage:any = SignUpPage;
  tabsPage:any = TabsPage;
  isAuthenticated: boolean = true;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private authService:Authservice){
    // firebase.initializeApp({
    //   apiKey: "AIzaSyCetUD5Ty5aMG0-MzLAU_EdicfPs522V-U",
    //   authDomain: "ionic-recipe-book-c1f42.firebaseapp.com",
    //   databaseURL: "https://ionic-recipe-book-c1f42.firebaseio.com"
    // });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    // firebase.auth().onAuthStateChanged((user)=> {
    //   if(user) {
    //     console.log(`${user.email} is logged in`);
    //     this.isAuthenticated = true;
    //     this.nav.setRoot(this.tabsPage);
    //
    //   } else {
    //     console.log(`user is logged out`);
    //     this.isAuthenticated = false;
    //     this.nav.setRoot(this.signInPage);
    //   }
    // });
  }

  onLoad(page:any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    // this.authService.logOutFireBase().then().catch((e) => console.log(e));
  }
}

