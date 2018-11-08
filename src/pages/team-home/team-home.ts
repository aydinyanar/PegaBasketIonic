import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StandingsPage } from '../../pages/pages';
import { TeamDetailPage } from '../../pages/pages';

/**
 * Generated class for the TeamHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any= {};
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;

  }

  ionViewDidLoad() {
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}
