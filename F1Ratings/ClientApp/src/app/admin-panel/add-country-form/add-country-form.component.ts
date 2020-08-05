import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/shared/country.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-country-form',
  templateUrl: './add-country-form.component.html',
  styleUrls: ['./add-country-form.component.css']
})
export class AddCountryFormComponent implements OnInit {
  formModel = {
    Name: ""
  }
  
  countries: Array<object>;
  editFlag: boolean = false;
  countryId: number;

  constructor(private service: CountryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  onSubmit(form: NgForm){

    if (this.editFlag == true ) {
      this.service.editCountry({ Id: this.countryId, Name: form.value.Name}).subscribe( 
        res => {
          this.getAllCountries();
          this.onReset(form);
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not add country", "Error");
          }
        }
      );
    } else {
      
      this.service.addCountry(form.value).subscribe( 
        res => {
          this.getAllCountries();
        },
        err => {
          if (err.error) {
            this.toastr.error(err.error, "Error");
          } else {
            this.toastr.error("Could not add country", "Error");
          }
        }
      );
    }
  }

  getAllCountries(){
    this.service.allCountries().subscribe(
      (res: Array<object>) => {
        this.countries = res;
      },
      err => {
        if (err.error) {
          this.toastr.error(err.error, "Error");
        } else {
          this.toastr.error("Could not get countries", "Error");
        }
      }
    );
  }

  onDelete(country: any ){

    this.service.removeCountry(country.id).subscribe(
      res => {
        this.toastr.success("Country Deleted", "Success");
        this.getAllCountries();
      },
      err => {
        if (err.error) {
          this.toastr.error(err.error, "Error");
        } else {
          this.toastr.error("Could not delete countries", "Error");
        }
      }
    );

  }

  onEdit(country: any){
    this.editFlag = true;
    this.countryId = country.id;
    this.formModel.Name = country.name;
  }

  onReset(form: NgForm){
    form.reset();
    this.editFlag = false;
  }

}
