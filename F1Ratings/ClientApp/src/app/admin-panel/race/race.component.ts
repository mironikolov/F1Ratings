import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/shared/race.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  races: Array<object>;

  constructor(private service: RaceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
    
  }

  closeEditForm(raceListItem: HTMLElement){
    raceListItem.dataset.edit = 'false';
    this.refreshList();
  }

  refreshList(){
    this.service.allRaces().subscribe(
      (res: Array<object>) => this.races = res,
      err =>  this.toastr.error("Could not get races", "Error"),
      () => console.log(this.races)
    );
  }

  toggleForm(raceListItem: HTMLElement){
    if (raceListItem.dataset.edit == 'true') {
      raceListItem.dataset.edit = 'false';
    }else {
      raceListItem.dataset.edit = 'true';
    }
  }

  onDelete(race: any){
    this.service.removeRace(race.id).subscribe(
      res => {
        this.toastr.success("Race deleted", "Success");
        this.refreshList();
        },
        err => {
        if (err.error) {
          this.toastr.error(err.error, "Error");
        } else {
          this.toastr.error("Could not delete race", "Error");
        }
      }
    );
  }

}
