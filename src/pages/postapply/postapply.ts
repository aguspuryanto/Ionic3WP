import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the PostapplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postapply',
  templateUrl: 'postapply.html',
})
export class PostapplyPage {

  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    let backAction =  platform.registerBackButtonAction(() => {
			// console.log("second");
			this.navCtrl.pop();
			backAction();
		},2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostapplyPage');
  }

}
