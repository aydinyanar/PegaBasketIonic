import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {

  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    }
    console.log(this.map);
  }

  

}
