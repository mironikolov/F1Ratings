import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceResultService extends BaseService {
  raceResultControlerUrl = "api/RaceResults";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  addRaceResult(raceResult: object){
    return super.addEntity(raceResult, this.raceResultControlerUrl);
  }

  allRaceResult(){
    return super.allEntities(this.raceResultControlerUrl);
  }

  removeRaceResult(raceResult: number){
    return super.removeEntity(raceResult, this.raceResultControlerUrl);
  }

  editRaceResult(raceResult: object){
    return super.editEntity(raceResult, this.raceResultControlerUrl);
  }

  raceResultByRaceId(id: number){
    return this.http.get(`${this.baseUrl+this.raceResultControlerUrl}/${id}`);
  }
}
