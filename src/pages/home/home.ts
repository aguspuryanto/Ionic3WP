import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';

// Plugin
import { LoadingController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

// Page
import { PostdetailPage } from './../postdetail/postdetail';

// Modul
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	url: string = 'https://surabayajobfair.com/wp-json/wp/v2/posts';
	items: any;
	page: any;

	@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, private http: Http, public platform: Platform, public loading: LoadingController, private adMob: AdMobFree) {
		platform.registerBackButtonAction(() => {
			console.log("backPressed 1");
		});
  }

  ionViewDidEnter() {
		// this.slides.autoplayDisableOnInteraction = false;
		this.page = '1';

		let loading  = this.loading.create({
			content: 'Loading data from server'
		});
		loading.present();

		this.loadPosts( this.page ).then( data => {
			console.log('Posts loaded', data);
			this.items = data;
		});
				
		loading.dismiss();

		// return new Promise(resolve => {

		// 	this.http.get( this.url + '?page=' + this.page )
	  //   .map(res => res.json())
	  //   .subscribe(data => {
	  //     // we've got back the raw data, now generate the core schedule data
	  //     // and save the data for later reference
	  //     this.items = data;
		// 	});

		// });

		const bannerConfig: AdMobFreeBannerConfig = {
			id:'ca-app-pub-9293763250492023/8573028797',
			autoShow: true,
			isTesting: true
		  }
		  this.adMob.banner.config(bannerConfig);
		  this.adMob.banner.prepare().then(()=>{
			//   banner Ad is ready
			//   if we set autoShow to false, then we will need to call the show method her
			  this.adMob.banner.show();
		  }).catch(err => console.log(err));
	}

	loadPosts( page ) {
		if( !page ) {
	    // let page = '1';
	  }
		return new Promise(resolve => {

			this.http.get( this.url + '?per_page=25&page=' + page )
		    .map(res => res.json())
		    .subscribe(data => {
		      // we've got back the raw data, now generate the core schedule data
		      // and save the data for later reference
		      resolve( data );
				});

		});
	}

	// Pull to refresh and force reload
  forceReload(refresher) {
		let page = '1';
		this.loadPosts( page ).then( data => {
			// console.log('Posts loaded', data);
			this.items = data;
		});
		refresher.complete();
  }

	itemTapped(event, item) {
		this.navCtrl.push(PostdetailPage, {
		  item: item
		});
	}

	viewMaps(event, item){
		console.log("Event: " + event+"; " + item);
	}

	loadMore(infiniteScroll) {
		this.page++;
		this.loadPosts( this.page ).then( items => {
			// Loads posts from WordPress API
			let length = items["length"];
			if( length === 0 ) {
				infiniteScroll.complete();
				return;
			}
			for (var i = length - 1; i >= 0; i--) {
				this.items.push( items[i] );
			}
			infiniteScroll.complete();
		});
	}

	getTitles(ev: any) {
		this.initializeItems();
		// set val to the value of the searchbar
		let val = ev.target.value;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return (item.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}
	
	initializeItems() {
		console.log('initialized all items');
		// this.items = this.posts;
	}

}
