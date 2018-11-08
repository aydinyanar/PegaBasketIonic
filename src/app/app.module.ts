import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage ,TournamentsPage,TeamsPage,CameraPage,TeamDetailPage,BarcodeScannerPage, StandingsPage,TeamHomePage,GamesPage,MapPage,DirectionPage} from '../pages/pages';
import { EliteApi,DBProvider} from './shared/shared';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    StandingsPage,
    GamesPage,MapPage,DirectionPage,CameraPage,BarcodeScannerPage
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCCZRxaNio3h8w-6KlW2mhjRrlS5Mc6ZmU'})  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage, 
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    StandingsPage,
    GamesPage,MapPage,DirectionPage,CameraPage,BarcodeScannerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Geolocation,Vibration,Camera, BarcodeScanner,SQLite,DBProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
