import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService extends BaseService{
  racesControlerUrl = "api/Races";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }
  addRace(race: object){
    return super.addEntity(race, this.racesControlerUrl);
  }

  allRaces(){
    return super.allEntities(this.racesControlerUrl);
  }

  removeRace(raceId: number){
    return super.removeEntity(raceId, this.racesControlerUrl);
  }

  editRace(race: object){
    return super.editEntity(race, this.racesControlerUrl);
  }

  allRacesByYear(year: number){
    return this.http.get(`${this.baseUrl+this.racesControlerUrl}/${year}`);
  }
}
