import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Instagram } from '@ionic-native/instagram';


@IonicPage()
@Component({
  selector: 'page-subirfoto',
  templateUrl: 'subirfoto.html',
})
export class SubirfotoPage {

  imagen;
  

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private diagnostic: Diagnostic,
               private imagePicker: ImagePicker,
               private instagram:Instagram,
               public loadingCtrl: LoadingController,
               private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubirfotoPage');
  }

  permisoCamara(){
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized)
          this.sacarFoto()
      else {
          this.diagnostic.requestCameraAuthorization().then((status) => {
              if(status == this.diagnostic.permissionStatus.GRANTED)
                  this.sacarFoto();
              else {
                console.log("No hay permisos para la camara");
                  // Permissions not granted
                  // Therefore, create and present toast
                 /*  this.toastCtrl.create(
                      {
                          message: "No hay acceso a la camara", 
                          position: "bottom",
                          duration: 5000
                      }
                  ).present(); */
              }
          });
      }
  });
  }

  sacarFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imagen = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  seleccionarFoto(){

      let opciones:ImagePickerOptions ={
        quality:70,
        maximumImagesCount:1,
        outputType:1
      };

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagen = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
  }

  subirFoto(){
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Por favor espere...'
    });
    loading.present();
    this.instagram.share(this.imagen, 'Se copió al portapapeles!')
    .then(() => {
      // Image might have been shared but you can't be 100% sure
      console.log("Se debe haber subido la foto");
      loading.dismiss();
    })
    .catch(err => {
      // Handle error
      loading.dismiss();
      console.error("no se subio");      
      console.error(err);      
    })

  }


}
