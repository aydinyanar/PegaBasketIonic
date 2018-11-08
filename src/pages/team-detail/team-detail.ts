import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteApi, DBProvider } from '../../app/shared/shared';
import { GamesPage } from '../../pages/pages';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  isFollowing: any;
  team: any = {};
  games: any = [];
  teamStanding: any = {};
  tournamentData: any;
  useDateFilter = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    private alertController: AlertController,
    private toastController: ToastController,
    private dbProvider: DBProvider) {

    this.dateFilter = new Date().toISOString();
  }

  ionViewDidLoad() {

    this.team = this.navParams.data;
    this.isFollowing = false;//this.dbProvider.isFollowing(this.team);
    this.tournamentData = this.eliteApi.getCurrentTournament();
    this.games = _.chain(this.tournamentData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let teamName = isTeam1 ? g.team1 : g.team2;
        let score = this.GetScore(isTeam1, g.team1Score, g.team2Score);
        let winningIndicator = this.GetWiningIndicator(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          teamName: teamName,
          opponent: opponentName,
          scoreDisplay: score,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          homeAway: (isTeam1 ? "vs." : "at"),
          winningIndicator: winningIndicator
        };
      })
      .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });
  }
  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }

  GetWiningIndicator(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = isTeam1 ? team1Score : team2Score;
      let opponentScore = isTeam1 ? team2Score : team1Score;
      let winIndicator = teamScore > opponentScore ? "W" : "L";
      return winIndicator;
    }
    else {
      return "";
    }
  }
  GetScore(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = isTeam1 ? team1Score : team2Score;
      let opponentScore = isTeam1 ? team2Score : team1Score;

      return teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked(event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamesPage, sourceGame);
  }

  dateChanged() {

    if (this.useDateFilter && this.dateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }
    else {
      this.games = this.allGames;
    }
  }

  refreshAll(refresher) {
    this.eliteApi.refreshCurrentTournament().subscribe(() => 
    {
      refresher.complete();
      this.ionViewDidLoad();
    }
    );
  }

  getWinningClass(indicator) {
    if (indicator) {
      if (indicator == "W") {
        return "badge-primary";
      }
      else {
        return "badge-danger";
      }
    }
    else {
      return "";
    }
  }
  toogleFollow() {
    if (this.isFollowing) {
      let alert = this.alertController.create({
        title: 'UnFollow?',
        message: 'Are you sure to unfollow the team',
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFollowing = false;
              //this.userSettings.removeFromFavorites(this.team);

              let toast = this.toastController.create({
                message: 'You unfollowed this team',
                duration: 2000,
                position: 'bottom'

              });
              toast.present();

            }
          },
          {
            text: 'No'
          }
        ]

      });
      alert.present();
    }
    else {
      // this.isFollowing = true;
      // this.dbProvider.insert(this.team, this.tournamentData.tournament.id, this.tournamentData.tournament.name);
      // this.dbProvider.get().then(data=>this.favorites=data);
    }
  }
}
