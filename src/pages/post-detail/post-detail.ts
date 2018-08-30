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

  	constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private socialSharing: SocialSharing) {
  		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');

		let backAction =  platform.registerBackButtonAction(() => {
			console.log("second");
			this.navCtrl.pop();
			backAction();
		},2);
  	}

  	ionViewDidLoad() {
		console.log('ionViewDidLoad PostDetailPage:' + JSON.stringify(this.selectedItem.id));
  	}
	
	shareSheetShare() {
		console.log( JSON.stringify(this.selectedItem) );

		// var sendTo = "";
		let subject = this.removeHTMLInfo(this.selectedItem.content.rendered);
		var message = this.selectedItem.title.rendered;
		// var image = "";
		var uri = this.selectedItem.link;

		this.socialSharing.share(message, subject, "", uri).then(() => {
		  console.log("shareSheetShare: Success");
		}).catch(() => {
		  console.error("shareSheetShare: failed");
		});
	}

	whatsappShare(){
		var msg = this.removeHTMLInfo(this.selectedItem.content.rendered) + "-" + this.selectedItem.title.rendered;

		// shareViaWhatsAppToPhone('+31611111111', 'Message via WhatsApp')
		this.socialSharing.shareViaWhatsApp(msg, null, null).then(() => {
			console.log("shareSheetShare: Success");
		}).catch(() => {
			console.error("shareSheetShare: failed");
		});
	}

	twitterShare(){
		var msg = this.removeHTMLInfo(this.selectedItem.content.rendered) + "-" + this.selectedItem.title.rendered;
		this.socialSharing.shareViaTwitter(msg, null, this.selectedItem.link).then(() => {
			console.log("shareSheetShare: Success");
		}).catch(() => {
			console.error("shareSheetShare: failed");
		});
	}

	facebookShare() {
		var msg = this.removeHTMLInfo(this.selectedItem.content.rendered) + "-" + this.selectedItem.title.rendered;
		this.socialSharing.shareViaFacebook(msg, null, this.selectedItem.link).then(() => {
			console.log("shareSheetShare: Success");
		}).catch(() => {
			console.error("shareSheetShare: failed");
		});
	}

	removeHTMLInfo(value: string){  
		if (value){
			return value.replace(/<\/?[^>]+>/gi, "");
		}
	}
}
