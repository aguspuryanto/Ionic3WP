import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

// Plugin
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the PostmapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;

@IonicPage()
@Component({
  selector: 'page-postmaps',
  templateUrl: 'postmaps.html',
})
export class PostmapsPage implements OnInit {

  selectedItem: any;
  map: any;
  markers = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    let backAction =  platform.registerBackButtonAction(() => {
			// console.log("second");
			this.navCtrl.pop();
			backAction();
		},2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostmapsPage');
  }

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    var point = {lat: 13.038039, lng: 80.21597};
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 15,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: true
    });    
    // this.createMapMarker(point);

    return new Promise((resolve) => {
      
      this.geolocation.getCurrentPosition().then((position) => {
  
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.map = new google.maps.Map(divMap, mapOptions);
        resolve(true);
        this.createMapMarker({lat: position.coords.latitude, lng: position.coords.longitude});
  
      }, (err) => {
        console.log(err);
      });

    });
  }
    
  private createMapMarker(place:any):void {
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      // position: place
      position: this.map.getCenter()
    });
    this.markers.push(marker);

    let content = "<h4>"+ this.selectedItem.meta.company + "</h4><p>" + this.selectedItem.meta.company_address + "</p>"; 
    this.addInfoWindow(marker, content);
  }

  private addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

}
