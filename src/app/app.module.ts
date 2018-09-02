import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Pro} from "@ionic/pro";
import {ApiProvider} from "../providers/api/api";
import {GlobalVariableProvider} from "../providers/gloabal-variable/gloabal-variable";
import {RegisterPage} from "../pages/register/register";
import {HTTP} from "@ionic-native/http";
import {Toast} from "@ionic-native/toast";
Pro.init('151d0468', {
  appVersion: '001'
})
@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    GlobalVariableProvider,
    HTTP,Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
