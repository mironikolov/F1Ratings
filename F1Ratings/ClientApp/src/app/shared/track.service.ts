import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService {
  tracksControlerUrl = "api/Tracks";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  addTrack(track: object){
    return super.addEntity(track, this.tracksControlerUrl);
  }

  allTracks(){
    return super.allEntities(this.tracksControlerUrl);
  }

  removeTrack(trackId: number){
    return super.removeEntity(trackId, this.tracksControlerUrl);
  }

  editTrack(track: object){
    return super.editEntity(track, this.tracksControlerUrl);
  }
}
