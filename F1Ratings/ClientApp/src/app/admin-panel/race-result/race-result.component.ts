import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RaceService } from 'src/app/shared/race.service';
import { DriverService } from 'src/app/shared/driver.service';
import { RaceResultService } from 'src/app/shared/race-result.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {
  races: Array<any>;
  raceResults: Array<any>;
  drivers: Array<any>;
  formModel = {
    Year: null,
    RaceId: null
  };
  constructor(private service: RaceResultService ,private raceService: RaceService, private toastr: ToastrService, private driverService: DriverService) { }

  ngOnInit(): void {
  }

  yearChanged(){
    this.raceService.allRacesByYear(this.formModel.Year).subscribe(
      (res: Array<object>) => {
        this.races = res;
        this.toastr.success("Races are added to the select", "Error");
      },
      err => this.toastr.error("Could not get races", "Error")
    );
  }

  raceChanged(){ 
    this.driverService.allDriversByYear(this.formModel.Year).subscribe(
      (res: Array<object>) => {
        this.drivers = res;
      },
      err => this.toastr.error("Could not get drivers", "Error")
    );

    this.service.raceResultByRaceId(this.formModel.RaceId).subscribe(
      (res: Array<object>) => {
        this.raceResults = res;
      },
      err => this.toastr.error("Could not get race result", "Error")
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onSave(){
    this.raceResults.forEach((result, index) => {
      
      if (result.driver) {
        result.position = index + 1;
        this.service.editRaceResult(result).subscribe(
          () => this.toastr.success("Race result edited", "Success"),
          err => this.toastr.error(err.message, "Error")
        );
      } else {
        let dto = {
          DriverId: result.id,
          RaceId: this.formModel.RaceId,
          Position: index+1
        }
        
        this.service.addRaceResult(dto).subscribe(
          () => this.toastr.success("Race result added", "Success"),
          err => this.toastr.error(err.message, "Error")
        );
      }

    });
  }

  getRaceResultCellData(raceResult: any, property: string){
    return raceResult.driver?.[property] ?? raceResult?.[property] ?? '';
  }
}
