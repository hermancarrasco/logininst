import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogininstProvider } from "../../providers/logininst/logininst";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  
  constructor(public navCtrl: NavController,public login:LogininstProvider) {
     
     
  }
  ionViewWillEnter(){
    console.log("ionviewdidload");
    //&& this.login.logueado
    if (!this.login.fotos && this.login.logueado ) {
      this.login.obtenerFotos();
    }
    
  }
  

}
