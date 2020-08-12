import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DriverService } from '../../../shared/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-driver-form',
  templateUrl: './add-driver-form.component.html',
  styleUrls: ['./add-driver-form.component.css']
})
export class AddDriverFormComponent implements OnInit {
  @Input() driverToEdit: any;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter();

  formModel = {
    FirstName: '',
    Surname: '',
    LastName: '',
    Wins: '',
    Podiums: '',
    Starts: '',
    Debut: '',
    Retired: ''
  }

  constructor( private service: DriverService, private toastr: ToastrService ) { }

  ngOnInit(): void {

    if (this.driverToEdit) {
      this.formModel.FirstName = this.driverToEdit.firstName;
      this.formModel.Surname = this.driverToEdit.surname;
      this.formModel.LastName = this.driverToEdit.lastName;
      this.formModel.Wins = this.driverToEdit.wins;
      this.formModel.Podiums = this.driverToEdit.podiums;
      this.formModel.Starts = this.driverToEdit.starts;
      this.formModel.Debut = this.driverToEdit.debut;
      this.formModel.Retired = this.driverToEdit.retired;
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    if (this.driverToEdit) {
      form.value.Id = this.driverToEdit.id;
      
      this.service.editDriver(form.value).subscribe(
        res => {
          this.toastr.success("Driver edited","Success");
          this.onEdit.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not edit driver", "Error");
          }
        }
      );
    } else {
      this.service.addDriver(form.value).subscribe(
        res => {
          this.toastr.success("Driver added","Success");
          this.onAdd.emit(true);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not add driver", "Error");
          }
        }
      );
    }
  }
}
