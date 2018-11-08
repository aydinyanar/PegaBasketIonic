import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class EliteApi {
    private baseUrl = 'https://elite-schedule-app-b2e8c.firebaseio.com';
    constructor(private http: Http) { }
    currentTournament: any = {};
    private tournamentsData:any={};

    getTournaments() {
        return new Promise(resolve => {

            this.http.get(this.baseUrl + '/tournaments.json').subscribe(res => resolve(res.json()));

        });
    }

    // getTournamentsDetails(selectedTournamnetId): Observable<any> {
    //     return this.http.get(this.baseUrl + '/tournaments-data/' + selectedTournamnetId + '.json')
    //         .map((response: Response) => {
    //             this.currentTournament = response.json();
    //             return this.currentTournament;
    //         })
    // }

    getTournamentsDetails(selectedTournamnetId, forceRefresh:boolean=false): Observable<any> {

        if(!forceRefresh && this.tournamentsData[selectedTournamnetId])
        {
            this.currentTournament = this.tournamentsData[selectedTournamnetId];
            return Observable.of(this.currentTournament);
        }
        else
        {
        return this.http.get(this.baseUrl + '/tournaments-data/' + selectedTournamnetId + '.json')
            .map((response: Response) => {
                this.tournamentsData[selectedTournamnetId]=response.json();
                this.currentTournament = this.tournamentsData[selectedTournamnetId];
                return this.currentTournament;
            })
        }
    }

    getCurrentTournament()
    {
        console.log(this.currentTournament);
        return this.currentTournament;
    }

    refreshCurrentTournament()
    {
        return this.getTournamentsDetails(this.currentTournament.tournament.id,true);
    }

}