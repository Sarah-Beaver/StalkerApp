import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';
import { FriendPage } from '../pages/friend/friend';
import { LocationPage } from '../pages/location/location';
import { LoginPage } from '../pages/login/login';
import { RegisterPage} from '../pages/register/register';
import { ResetpassPage } from '../pages/resetpass/resetpass';
import { AllUsersPage } from '../pages/all-users/all-users';
import { PersonalchatPage } from '../pages/personalchat/personalchat';
import {FriendProfilePage} from '../pages/friend-profile/friend-profile';



//Firebase team imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FIREBASE_CONFIG } from './credentials'
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook } from '@ionic-native/facebook';
import {LocationTracker} from '../providers/location-tracker/location-tracker';
import { ChatService } from './app.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
    ProfilePage,
    FriendPage,
    LocationPage,
    LoginPage,
    RegisterPage,
    ResetpassPage,
    AllUsersPage,
    PersonalchatPage,
    FriendProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapPage,
    ProfilePage,
    FriendPage,
    LocationPage,
    LoginPage,
    RegisterPage,
    ResetpassPage,
    AllUsersPage,
    PersonalchatPage,
    FriendProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    TwitterConnect,
    Camera,
    AngularFireStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GooglePlus,
    AuthProvider,
    TwitterConnect,
    LocationTracker,
    ChatService,
   // Storage
 

  ]
})
export class AppModule {}
