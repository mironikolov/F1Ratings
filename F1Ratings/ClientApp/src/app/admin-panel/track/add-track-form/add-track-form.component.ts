import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/shared/country.service';
import { TrackService } from 'src/app/shared/track.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-track-form',
  templateUrl: './add-track-form.component.html',
  styleUrls: ['./add-track-form.component.css']
})
export class AddTrackFormComponent implements OnInit {
  formModel = {
    Name: '',
    Country: ''
  };
  countries: Array<object>;
  @Input() trackToEdit: any;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter();

  constructor(private service: TrackService, private countryService: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.countryService.allCountries().subscribe(
      (res: Array<object>) => this.countries = res,
      err => this.toastr.error("Could not get countries", "Error")
    );

    if (this.trackToEdit) {
      this.formModel.Name = this.trackToEdit.name;
      this.formModel.Country = this.trackToEdit.country.id
    }
  }

  onSubmit( form: NgForm ){
    if (this.trackToEdit) {
      form.value.Id = this.trackToEdit.id;
      
      this.service.editTrack(form.value).subscribe(
        res => {
          this.toastr.success("Track edited","Success");
          this.onEdit.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not edit track", "Error");
          }
        }
      );
    } else {
      this.service.addTrack(form.value).subscribe(
        res => {
          this.toastr.success("Track added","Success");
          this.onAdd.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not add track", "Error");
          }
        }
      );
      
    }
  }
}
