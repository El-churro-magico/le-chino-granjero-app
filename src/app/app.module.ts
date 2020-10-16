// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Ionic imports
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Chooser} from '@ionic-native/chooser/ngx'

import {HttpClientModule} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx'

// Component imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services imports
import { AuxService } from './services/aux.service'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuxService,
    Chooser,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
