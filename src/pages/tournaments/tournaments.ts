import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../../pages/pages';
import { EliteApi } from '../../app/shared/shared';


/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private eliteApi: EliteApi, 
  private loadingController:LoadingController) {

  }

  ionViewDidLoad() {

  let loader=  this.loadingController.create({
      content:'Loading Tournaments'
    });

    loader.present().then(()=>{
    this.eliteApi.getTournaments().then(data => this.tournaments = data);
    loader.dismiss();
    }
    );

  }

  itemTapped(event, tournamnet) {
    this.navCtrl.push(TeamsPage, tournamnet);
  }


}
