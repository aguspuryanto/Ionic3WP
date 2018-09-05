import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';
// Plugin
import { LoadingController } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';
// Page
import { PostDetailPage } from './../post-detail/post-detail';
// Modul
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var HomePage = (function () {
    function HomePage(navCtrl, http, platform, loading, adMob) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.platform = platform;
        this.loading = loading;
        this.adMob = adMob;
        this.url = 'https://surabayajobfair.com/wp-json/wp/v2/posts';
        platform.registerBackButtonAction(function () {
            console.log("backPressed 1");
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // this.slides.autoplayDisableOnInteraction = false;
        this.page = '1';
        var loading = this.loading.create({
            content: 'Loading data from server'
        });
        loading.present();
        this.loadPosts(this.page).then(function (data) {
            console.log('Posts loaded', data);
            _this.items = data;
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
        var bannerConfig = {
            id: 'ca-app-pub-9293763250492023/8573028797',
            autoShow: true,
            isTesting: true
        };
        this.adMob.banner.config(bannerConfig);
        this.adMob.banner.prepare().then(function () {
            //   banner Ad is ready
            //   if we set autoShow to false, then we will need to call the show method her
            //   banner Ad is ready
            //   if we set autoShow to false, then we will need to call the show method her
            _this.adMob.banner.show();
        }).catch(function (err) { return console.log(err); });
    };
    HomePage.prototype.loadPosts = function (page) {
        var _this = this;
        if (!page) {
            // let page = '1';
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '?per_page=25&page=' + page)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                resolve(data);
            });
        });
    };
    // Pull to refresh and force reload
    // Pull to refresh and force reload
    HomePage.prototype.forceReload = 
    // Pull to refresh and force reload
    function (refresher) {
        var _this = this;
        var page = '1';
        this.loadPosts(page).then(function (data) {
            // console.log('Posts loaded', data);
            // console.log('Posts loaded', data);
            _this.items = data;
        });
        refresher.complete();
    };
    HomePage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(PostDetailPage, {
            item: item
        });
    };
    HomePage.prototype.viewMaps = function (event, item) {
        console.log("Event: " + event + "; " + item);
    };
    HomePage.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        this.page++;
        this.loadPosts(this.page).then(function (items) {
            // Loads posts from WordPress API
            var length = items["length"];
            if (length === 0) {
                infiniteScroll.complete();
                return;
            }
            for (var i = length - 1; i >= 0; i--) {
                _this.items.push(items[i]);
            }
            infiniteScroll.complete();
        });
    };
    HomePage.prototype.getTitles = function (ev) {
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage.prototype.initializeItems = function () {
        console.log('initialized all items');
        // this.items = this.posts;
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = function () { return [
        { type: NavController, },
        { type: Http, },
        { type: Platform, },
        { type: LoadingController, },
        { type: AdMobFree, },
    ]; };
    HomePage.propDecorators = {
        "slides": [{ type: ViewChild, args: [Slides,] },],
    };
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map