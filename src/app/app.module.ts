import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../providers/auth-service/auth-service';
import { MensajesProvider } from '../providers/mensajes/mensajes';
import { CrudProvider } from '../providers/crud/crud';
import { DiasCrudProvider } from '../providers/dias-crud/dias-crud';

const firebaseConfig = {
  apiKey: "AIzaSyADooNFyyvK0ugYKr_h0kdBL6rNnES1U48",
  authDomain: "contabus.firebaseapp.com",
  databaseURL: "https://contabus.firebaseio.com",
  projectId: "contabus",
  storageBucket: "contabus.appspot.com",
  messagingSenderId: "433510143251"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'contabus'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MensajesProvider,
    CrudProvider,
    DiasCrudProvider
  ]
})
export class AppModule {}
