import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampusService } from '../campus.service';
import { Campus } from '../campus';
import { Building } from '../../building/building';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-campus-details',
  templateUrl: './campus-details.component.html',
  styleUrls: ['./campus-details.component.css']
})
export class CampusDetailsComponent implements OnInit {
  public campus: Campus = new Campus();
  public buildings: Building[] = [];
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private campusService: CampusService,
              private _location: Location,
              public toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/campuses/${id}`;
        this.campusService.getCampus(uri).subscribe(
          campus => {
            this.campus = campus;
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }


  onDelete(): void {
    this.campusService.deleteCampus(this.campus)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          this.toastr.error('Delete dependent entities before');
        });
  }
}
