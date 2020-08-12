import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from 'src/app/shared/driver.service';
import { refCount } from 'rxjs/operators';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  drivers: Array<object>;

  constructor(private service: DriverService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  closeEditForm(raceListItem: HTMLElement){
    raceListItem.dataset.edit = 'false';
    this.refreshList();
  }

  refreshList(){
    this.service.allDriver().subscribe(
      (res: Array<object>) => this.drivers = res,
      err =>  this.toastr.error("Could not get drivers", "Error"),
      () => console.log(this.drivers)
    );
  }

  toggleForm(raceListItem: HTMLElement){
    if (raceListItem.dataset.edit == 'true') {
      raceListItem.dataset.edit = 'false';
    }else {
      raceListItem.dataset.edit = 'true';
    }
  }

  onDelete(driver: any){
    this.service.removeDriver(driver.id).subscribe(
      res => {
        this.toastr.success("Driver deleted", "Success");
        this.refreshList();
        },
        err => {
        if (err.error) {
          this.toastr.error(err.error, "Error");
        } else {
          this.toastr.error("Could not delete driver", "Error");
        }
      }
    );
  }

}
