import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the LogininstProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogininstProvider {
  accessToken: string;
  user: any;
  logueado:boolean=false;
  fotos:any;
  error:string;

  constructor(public zone: NgZone,public http: HttpClient,private storage: Storage,private loadingCtrl:LoadingController) {
    console.log('Hello LogininstProvider Provider');
    this.storage.get('perfil').then(user => {
      this.zone.run(() => {
        this.user = user;
      });  
    });
    this.storage.get('access_token').then(token => {this.accessToken = token;
      this.zone.run(() => {        
        if(token){
          console.log("el user tiene datos");
          this.logueado=true;
        }
      });
      
    });
    
  }

  login(token:string){
    let error1="thorize%2F%3Fclient_id%3Dcd24c2f3f93a4099a35a546ad9e4e60d%26redirect_uri%3Dhttps%3A%2F%2Fhermancarrasco.auth0.com%2Flogin%2Fcallback%26response_type%3Dtoken";
    let error2="ze/%3Fclient_id%3Dcd24c2f3f93a4099a35a546ad9e4e60d%26redirect_uri%3Dhttps%3A//hermancarrasco.auth0.com/login/callback%26response_type%3Dtoken";
    if (token==error1 || token==error2) {
      this.zone.run(() => {
        this.error="por favor vuelva a iniciar."
      });
    
    } else {
      
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Por favor espere...'
    });
    loading.present();
    
    const promesa= new Promise( (resolve,reject)=>{
      let url=`https://api.instagram.com/v1/users/self/?access_token=${token}`;
      this.http.get(url)
      .subscribe(data=>{
        console.log("desde el servicio promesa");
        
        /* this.storage.set('access_token', token);
        this.storage.set('perfil', data); */
        if (data) {
          console.log(data);
          this.logueado = Date.now()>1;
        resolve(data);
        }
        
      });
    });
    promesa.then(data=>{
       this.storage.set('access_token', token);
      //this.storage.set('perfil', data);
      this.storage.set('perfil', data).then(val =>
        this.zone.run(() => {
          this.user = data;
            if(this.user){
              this.logueado=true;
              loading.dismiss();                              
            }
        })
      );
      //this.user=data;

    console.log("se ejecuta el then");
    console.log(data);
    
    }).catch(data=>{
      console.log("error en la promesa del login");
      loading.dismiss();
    });
    }

    // console.log("token desde el login");
    // console.log(token);
    
    

    
      
  }

  cerrarSesion(){
    this.storage.remove('perfil');
    this.storage.remove('access_token');
    this.accessToken = null;
    this.user = null;
    this.logueado = false;
    this.fotos=null;
    this.error=null;
    console.log("datos usuario cerrar sesion");
    
    console.log(this.user);
    
    //this.titulo="Iniciar Sesión";
  }

  obtenerFotos(){

    if(this.accessToken){
      
      const promesa= new Promise( (resolve,reject)=>{
        let url=`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.accessToken}`;
        this.http.get(url)
        .subscribe(data=>{
          console.log("desde el servicio promesa");
          
          /* this.storage.set('access_token', token);
          this.storage.set('perfil', data); */
          if (data) {
            console.log(data);
            this.logueado = Date.now()>1;
          resolve(data);
          }
          
        });
      });

      promesa.then(data=>{
        this.fotos=data["data"];
        
      });


      
    }else{
      // let no="Debes Iniciar Sesión"
      // return no;
      const promesa= new Promise( (resolve,reject)=>{
        let url=`https://api.instagram.com/v1/users/self/media/recent/?access_token=8552057049.cd24c2f.c05fba95cc7d4bcd86aeadb95340823c`;
        this.http.get(url)
        .subscribe(data=>{
          console.log("desde el servicio promesa");
          
          /* this.storage.set('access_token', token);
          this.storage.set('perfil', data); */
          if (data) {
            console.log(data);
            this.logueado = Date.now()>1;
          resolve(data);
          }
          
        });
      });

      promesa.then(data=>{
        this.fotos=data["data"];
        return data;
      });
    }
    
  }


}
