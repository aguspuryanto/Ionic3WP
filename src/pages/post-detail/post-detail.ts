import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform } from 'ionic-angular';

// Plugin
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
	@ViewChild (Navbar) navBar : Navbar; // add this line

	selectedItem: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private socialSharing: SocialSharing) {
  		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		
		//Check Hardware Back Button Double Tap to Exit And Close Modal On Hardware Back
		// let lastTimeBackPress = 0;
		// let timePeriodToExit  = 2000;
		// this.platform.registerBackButtonAction(() => {
		// 	let activePortal = this.MyApp._loadingPortal.getActive() || // Close If Any Loader Active
		// 	this.MyApp._modalPortal.getActive() ||  // Close If Any Modal Active
		// 	this.MyApp._overlayPortal.getActive(); // Close If Any Overlay Active
		// 	if (activePortal) {
		// 		activePortal.dismiss();
		// 	}
		// 	else if(this.navCtrl.canGoBack()){
		// 	  this.navCtrl.pop();
		// 	}else{
		// 		//Double check to exit app
		// 		if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
		// 			this.platform.exitApp(); //Exit from app
		// 		} else {
		// 		  this.toast.create("Press back button again to exit");
		// 		  lastTimeBackPress = new Date().getTime();
		// 		}
		// 	}            
		// });

		let backAction = this.platform.registerBackButtonAction(() => {
			console.log("back to HomePage");
			this.navCtrl.pop();
			backAction();
		})
  	}

  	ionViewDidLoad() {
		console.log('ionViewDidLoad PostDetailPage:' + JSON.stringify(this.selectedItem.id));
		// this.navBar.backButtonClick = (e:UIEvent) => {   // add this event
		// 	this.navCtrl.pop();
	   	// };
  	}
	
	shareSheetShare() {
		console.log( JSON.stringify(this.selectedItem) );

		let sendTo   : any;
		let subject  : string 	= this.selectedItem.content.rendered;
		let message  : string 	= this.selectedItem.title.rendered;
		let image    : string	= '';
		let uri      : string	= this.selectedItem.link;

		this.socialSharing.share(message, subject, "", uri).then(() => {
		  console.log("shareSheetShare: Success");
		}).catch(() => {
		  console.error("shareSheetShare: failed");
		});
	}

	whatsappShare(){
		var msg = this.selectedItem.content + "-" + this.selectedItem.title ;
		this.socialSharing.shareViaWhatsApp(msg, null, null);
	}

	twitterShare(){
		var msg = this.selectedItem.content + "-" + this.selectedItem.title ;
		this.socialSharing.shareViaTwitter(msg, null, null);
	}

	facebookShare() {
		var msg = this.selectedItem.content + "-" + this.selectedItem.title ;
		this.socialSharing.shareViaFacebook(msg, null, null);
	}
}
