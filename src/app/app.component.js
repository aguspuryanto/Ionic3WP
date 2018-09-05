import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Page
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// Module
import { CacheService } from "ionic-cache";
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, app, cache) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.cache = cache;
        this.rootPage = HomePage;
        this.alertShown = false;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Set TTL to 12h
            // Okay, so the platform is ready and our plugins are available.
            // Set TTL to 12h
            _this.cache.setDefaultTTL(60 * 60 * 12);
            // Keep our cached results when device is offline!
            // Keep our cached results when device is offline!
            _this.cache.setOfflineInvalidate(false);
            // Here you can do any higher level native things you might need.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.platform.registerBackButtonAction(function () {
                // Catches the active view
                var nav = _this.app.getActiveNavs()[0];
                var activeView = nav.getActive();
                // Checks if can go back before show up the alert
                if (activeView.name === 'HomePage') {
                    if (nav.canGoBack()) {
                        nav.pop();
                    }
                    else {
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Confirm Exit',
                            message: 'Do you want Exit?',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        _this.nav.setRoot('HomePage');
                                        console.log('** Saída do App Cancelada! **');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        // this.logout();
                                        // this.logout();
                                        _this.platform.exitApp();
                                    }
                                }]
                        });
                        alert_1.present();
                    }
                }
                // if (this.alertShown==false) {
                //   this.presentConfirm();
                // }
            });
        });
    };
    MyApp.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Exit',
            message: 'Do you want Exit?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        _this.alertShown = false;
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Yes clicked');
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        alert.present().then(function () {
            _this.alertShown = true;
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = function () { return [
        { type: Platform, },
        { type: StatusBar, },
        { type: SplashScreen, },
        { type: AlertController, },
        { type: App, },
        { type: CacheService, },
    ]; };
    MyApp.propDecorators = {
        "nav": [{ type: ViewChild, args: [Nav,] },],
    };
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map