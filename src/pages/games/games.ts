import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';
import { TeamHomePage, MapPage, DirectionPage } from '../../pages/pages';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker }
  from '@ionic-native/google-maps';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  game: any = {};
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);

  }

  itemTapped(id) {
    let selectedTeam = this.eliteApi.currentTournament.teams.find(x => x.id === id);
    this.navCtrl.push(TeamHomePage, selectedTeam);
  }
  goToDirections() {

    this.navCtrl.push(DirectionPage);

  }



  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
  }


}



