import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker }
  from '@ionic-native/google-maps';

/**
 * Generated class for the DirectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  map: any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      console.log(resp.coords.latitude + ", " + resp.coords.longitude);
      let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map = {
        lat: location.lat,
        lng: location.lng,
        zoom: 12,
        markerLabel: 'Home'
      }
      console.log(this.map);



    });
  }
}
