import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { PostdetailPage } from '../pages/postdetail/postdetail';
// import { PostapplyPage } from '../pages/postapply/postapply';
// import { PostmapsPage } from './../pages/postmaps/postmaps';

// Module
import { CacheModule } from 'ionic-cache';
import { HttpModule } from '@angular/http';

// Plugin
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { TimeAgoPipe } from 'time-ago-pipe';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    // PostdetailPage,
    // PostapplyPage,
    // PostmapsPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    // PostdetailPage,
    // PostapplyPage,
    // PostmapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AdMobFree,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
