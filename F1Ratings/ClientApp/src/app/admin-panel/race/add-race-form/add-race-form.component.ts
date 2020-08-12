import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrackService } from 'src/app/shared/track.service';
import { ToastrService } from 'ngx-toastr';
import { RaceService } from '../../../shared/race.service';

@Component({
  selector: 'app-add-race-form',
  templateUrl: './add-race-form.component.html',
  styleUrls: ['./add-race-form.component.css']
})
export class AddRaceFormComponent implements OnInit {
  tracks: Array<object>;

  formModel = {
    Track: '',
    Date: '',
    ExtraInfo: ''
  }

  @Input() raceToEdit: any;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter();

  constructor(private trackService: TrackService, private toastr: ToastrService, private service: RaceService) { }

  ngOnInit(): void {
    this.trackService.allTracks().subscribe(
      (res: Array<object>) => { this.tracks = res },
      err => {
        this.toastr.error("Could not get tracks", "Error");
      }
    );

    if (this.raceToEdit) {
      this.formModel.Track = this.raceToEdit.track.id;
      this.formModel.Date = this.raceToEdit.date;
      this.formModel.ExtraInfo = this.raceToEdit.extraInfo;
    }
  }

  onSubmit(form: NgForm){
    
    if (this.raceToEdit) {
      form.value.Id = this.raceToEdit.id;
      
      this.service.editRace(form.value).subscribe(
        res => {
          this.toastr.success("Race edited","Success");
          this.onEdit.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not edit race", "Error");
          }
        }
      );
    } else {
      this.service.addRace(form.value).subscribe(
        res => {
          this.toastr.success("Race added","Success");
          this.onAdd.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not add race", "Error");
          }
        }
      );
    }
  }
}
