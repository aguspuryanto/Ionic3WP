import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { PostDetailPage } from './../pages/post-detail/post-detail';
// import { ApplyPage } from './../pages/apply/apply';
// Module
import { CacheModule } from 'ionic-cache';
import { HttpModule } from '@angular/http';
// Plugin
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { TimeAgoPipe } from 'time-ago-pipe';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        HomePage,
                        ListPage,
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
                    ],
                    providers: [
                        StatusBar,
                        SplashScreen,
                        SocialSharing,
                        AdMobFree,
                        { provide: ErrorHandler, useClass: IonicErrorHandler }
                    ]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map