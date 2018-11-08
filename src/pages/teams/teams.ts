import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../../pages/pages';
import { EliteApi } from '../../app/shared/shared';
import * as lodash from 'lodash';
/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];
  allTeamDivisions: any;
  allTeams: any;
  queryText : string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create();
    loader.present().then(() => {
      let selectedTournament = this.navParams.data;
      this.eliteApi.getTournamentsDetails(selectedTournament.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = lodash.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => lodash.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

        this.teams = this.allTeamDivisions;
        loader.dismiss();
      });
    });

  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams()
  {
    let searchText = this.queryText.toLowerCase();
    let filteredTeams = [];
    lodash.forEach(this.allTeamDivisions, td => {
      let teams = lodash.filter(td.divisionTeams,t=> (<any>t).name.toLowerCase().includes(searchText));
      if(teams.length)
        {
          filteredTeams.push({divisionName:td.divisionName,divisionTeams:teams});
        }
    });
      this.teams=filteredTeams;
  }

}
