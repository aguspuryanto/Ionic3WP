import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';

import { PostDetailPage } from './../post-detail/post-detail';

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

  constructor(public navCtrl: NavController, private http: Http, public platform: Platform) {
		platform.registerBackButtonAction(() => {
			console.log("backPressed 1");
		});
  }

  ionViewDidEnter() {
		// this.slides.autoplayDisableOnInteraction = false;
		this.page = '1';
		this.loadPosts( this.page ).then( data => {
			console.log('Posts loaded', data);
			this.items = data;
		});

		// return new Promise(resolve => {

		// 	this.http.get( this.url + '?page=' + this.page )
	  //   .map(res => res.json())
	  //   .subscribe(data => {
	  //     // we've got back the raw data, now generate the core schedule data
	  //     // and save the data for later reference
	  //     this.items = data;
		// 	});

		// });
	}

	loadPosts( page ) {
		if( !page ) {
	    // let page = '1';
	  }
		return new Promise(resolve => {

			this.http.get( this.url + '?page=' + page )
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
		if(this.loadPosts( page )){
			refresher.complete();
		}
  }

	itemTapped(event, item) {
		this.navCtrl.push(PostDetailPage, {
		  item: item
		});
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

}
