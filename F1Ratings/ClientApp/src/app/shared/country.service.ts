import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService{
  countriesControlerUrl = "api/Countries";

  constructor( http: HttpClient, @Inject('BASE_URL') baseUrl: string ) { 
    super( http, baseUrl);
  }

  addCountry(country: object){
    return super.addEntity(country, this.countriesControlerUrl);
  }

  allCountries(){
    return super.allEntities(this.countriesControlerUrl);
  }

  removeCountry(countryId: number){
    return super.removeEntity(countryId, this.countriesControlerUrl);
  }

  editCountry(country: object){
    return super.editEntity(country, this.countriesControlerUrl);
  }
}
