import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Page
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

// Module
import { CacheService } from "ionic-cache";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  public alertShown:boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public app: App, public cache: CacheService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      // Set TTL to 12h
      this.cache.setDefaultTTL(60 * 60 * 12); 
      // Keep our cached results when device is offline!
      this.cache.setOfflineInvalidate(false);

      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        // Checks if can go back before show up the alert
        if(activeView.name === 'HomePage') {
          if (nav.canGoBack()){
            nav.pop();
          } else {
            const alert = this.alertCtrl.create({
                title: 'Confirm Exit',
                message: 'Do you want Exit?',
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      this.nav.setRoot('HomePage');
                      console.log('** Saída do App Cancelada! **');
                    }
                },{
                    text: 'Yes',
                    handler: () => {
                      // this.logout();
                      this.platform.exitApp();
                    }
                }]
            });
            alert.present();
          }
        }

        // if (this.alertShown==false) {
        //   this.presentConfirm();  
        // }

      })

    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
    
    alert.present().then(()=>{
      this.alertShown=true;
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
