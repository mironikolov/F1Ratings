import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverService extends BaseService{
  driverControlerUrl = "api/Drivers";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  addDriver(driver: object){
    return super.addEntity(driver, this.driverControlerUrl);
  }

  allDriver(){
    return super.allEntities(this.driverControlerUrl);
  }

  removeDriver(driverId: number){
    return super.removeEntity(driverId, this.driverControlerUrl);
  }

  editDriver(driver: object){
    return super.editEntity(driver, this.driverControlerUrl);
  }

  allDriversByYear(year: number){
    return this.http.get(`${this.baseUrl+this.driverControlerUrl}/${year}`);
  }
}
