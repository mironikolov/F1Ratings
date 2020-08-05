import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/shared/track.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  tracks: Array<object>;
  
  constructor(private service: TrackService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  closeEditForm(trackListItem: HTMLElement){
    trackListItem.dataset.edit = 'false';
    this.refreshList();
  }

  refreshList(){
    this.service.allTracks().subscribe(
      (res: Array<object>) => this.tracks = res,
      err =>  this.toastr.error("Could not get tracks", "Error")
    );
  }

  toggleForm(trackListItem: HTMLElement){
    if (trackListItem.dataset.edit == 'true') {
      trackListItem.dataset.edit = 'false';
    }else {
      trackListItem.dataset.edit = 'true';
    }
  }

  onDelete(track: any){
    this.service.removeTrack(track.id).subscribe(
      res => {
        this.toastr.success("Track deleted", "Success");
        this.refreshList();
        },
        err => {
        if (err.error) {
          this.toastr.error(err.error, "Error");
        } else {
          this.toastr.error("Could not delete track", "Error");
        }
      }
    );
  }

}
