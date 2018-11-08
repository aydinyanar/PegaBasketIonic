import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TournamentsPage,MyTeamsPage,TeamsPage ,CameraPage,BarcodeScannerPage} from '../pages/pages';
import { EliteApi,DBProvider} from './shared/shared';
import { HttpModule } from '@angular/http';

@Component({
  templateUrl: 'app.html',
  providers:[
    EliteApi,HttpModule, DBProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favorites:any=[];

  rootPage: any = MyTeamsPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private dbProvider:DBProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.dbProvider.openDb();
      this.dbProvider.addSample();
    });
  }

   goHome()
    {
      this.nav.push(MyTeamsPage);
    }
    goToTournaments()
    {
      this.nav.push(TournamentsPage)
    }
    refreshFavorites()
    {
      console.log("refersh");
      //this.dbProvider.getRows().then(data=>this.favorites=data);
    }
    goToCamera()
    {
      this.nav.push(CameraPage);
    }
    goToBarcodeScanner()
    {
      this.nav.push(BarcodeScannerPage);
    }
}
