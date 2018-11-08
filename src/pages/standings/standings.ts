import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteApi } from '../../app/shared/shared';
/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  team: any;
  standings: any[];
  allStandings: any[];
  filteredStandings: any[];
  divisionFilter = 'division';
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let currentTournament = this.eliteApi.getCurrentTournament();
    this.standings = currentTournament.standings;
    this.allStandings = _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();
    this.filterDivision();
  }

  filterDivision() {
    if (this.divisionFilter == 'all') {
      this.filteredStandings = this.allStandings;
    }
    else {
      let filteredData = _.filter(this.standings, s => s.division === this.team.division);
      console.log (this.team);
      this.filteredStandings = _.chain(filteredData)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
        .value();

    }
  }
}

