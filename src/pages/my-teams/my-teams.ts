import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController ,Platform} from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../../pages/pages';
import { EliteApi, DBProvider } from '../../app/shared/shared';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the MyTeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  public favorites = [];
  public message: string="nothing";
 public names=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loader: LoadingController,
    private eliteApi: EliteApi,
    private dbProvider: DBProvider,
    private vibration: Vibration,
    private platform:Platform) {

       this
      .platform
      .ready()
      .then(() => {
        this
          .dbProvider
          .getRows()
          .then(s => {
            this.names = this.dbProvider.arr;
            this.message="ok";
          }).catch(x=>this.message=x.err);
      })
  }

  ionViewDidLoad() {
   
  }

  goToTournaments() {
    this.vibration.vibrate(2000);
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    console.log(favorite);
    let loader = this.loader.create({
      content: 'Team Loading',
      dismissOnPageChange: true
    });
    loader.present();
    let team = favorite.team;

    this.eliteApi.getTournamentsDetails(favorite.tournamentId).subscribe(t => this.navCtrl.push(TeamHomePage, team));
  }

}
