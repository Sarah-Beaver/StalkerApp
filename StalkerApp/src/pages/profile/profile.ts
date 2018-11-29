import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  myPhoto:any='../../assets/imgs/logo.png';
  options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    encodingType: this.camera.EncodingType.JPEG,
    targetWidth: 300,
    targetHeight: 300,
    saveToPhotoAlbum: false
  }

  trackingState: string = "Start Tracking"


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public camera: Camera,
    public database: DatabaseProvider
  ) { 
    database.userGetPic(auth.uid).then((pic)=>{this.myPhoto = pic;});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  async takePicture() {

    try {
      let imageData: string = await this.camera.getPicture(this.options);
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      await this.database.storeImg(this.myPhoto, this.auth.uid + '_profile.jpg');
      await this.database.userSetPic(this.auth.uid, this.auth.uid + '_profile.jpg');
      this.myPhoto = await this.database.userGetPic(this.auth.uid);
    } catch (e) {
      console.log(e);
    }

    /*!!!PLEASE USE ASYNC/AWAIT TO HELP PREVENT APP CRASHES!!!

    this.camera.getPicture(this.options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
    */

  }

  Logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  toggleTracking()
  {
    if(this.trackingState == "Start Tracking") this.trackingState = "Stop Tracking";
    else this.trackingState = "Start Tracking";
  }

  async tagLoc(){
    try{
      await this.database.userAddTag(this.auth.uid, 100, 100);
    }catch(e){
      console.log(e);
    }
  }

}
