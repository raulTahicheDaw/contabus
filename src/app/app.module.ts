import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service/auth-service';
import { MensajesProvider } from '../providers/mensajes/mensajes';

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
    AngularFireDatabaseModule  ],
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
    MensajesProvider
  ]
})
export class AppModule {}
