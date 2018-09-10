import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { LogininstProvider } from '../../providers/logininst/logininst';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token:string;
  datos:string;
  constructor(public navCtrl: NavController, private themeableBrowser: ThemeableBrowser, public logService:LogininstProvider,private platform:Platform) {

      
  }

  ira(){
 
const options: ThemeableBrowserOptions = {
  statusbar: {
      color: '#ffffffff'
  },
  toolbar: {
      height: 44,
      color: '#f0f0f0ff'
  },
  title: {
      color: '#003264ff',
      showPageTitle: true
  },
  backButton: {
    wwwImage: 'assets/img/x.png',
    align: 'left',
    event: 'backPressed'
  },
  closeButton: {
      wwwImage: 'assets/imgs/x.png',
      align: 'left',
      event: 'closePressed'
  },
  clearcache:true
  ,
  backButtonCanClose: true
};
//http://172.20.10.4
//https://www.instagram.com/oauth/authorize/?client_id=cd24c2f3f93a4099a35a546ad9e4e60d&redirect_uri=https://hermancarrasco.auth0.com/login/callback&response_type=token
if (this.platform.is('ios')) {
  const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://www.instagram.com/oauth/authorize/?client_id=cd24c2f3f93a4099a35a546ad9e4e60d&redirect_uri=https://hermancarrasco.auth0.com/login/callback&response_type=token', '_blank',options);
  console.log("browser llamado:");
  browser.on('loadstop').subscribe(event => {
    console.log("event");
    this.datos=event.url;
    this.token=this.datos.substring(61);
    //this.datos=this.datos.substring(61);
    this.logService.login(this.token);
    console.log("token listo:"+this.token);
    
    console.log(event);
    browser.close();
    });
    console.log("browser:");
    
console.log(browser);
} else if(this.platform.is('android')){
  const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://www.instagram.com/oauth/authorize/?client_id=cd24c2f3f93a4099a35a546ad9e4e60d&redirect_uri=https://hermancarrasco.auth0.com/login/callback&response_type=token', '_blank',options);
  console.log("browser llamado:");
  browser.on('loadstop').subscribe(event => {
    console.log("event");
    this.datos=event.url;
    this.token=this.datos.substring(61);
    //this.datos=this.datos.substring(61);
    this.logService.login(this.token);
    console.log("token listo:"+this.token);
    
    console.log(event);
    if (this.token=="ze/%3Fclient_id%3Dcd24c2f3f93a4099a35a546ad9e4e60d%26redirect_uri%3Dhttps%3A//hermancarrasco.auth0.com/login/callback%26response_type%3Dtoken") {
      
    } else {
      browser.close();  
    }
    
    });
    console.log("browser:");
    
console.log(browser);
}

}

subirFoto(){
  this.navCtrl.push("SubirfotoPage");
}




}
