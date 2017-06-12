import { Component, OnInit } from '@angular/core';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';
import { OwnerService } from '../../../user/owner.service';

@Component({
  selector: 'app-closed-license-list',
  templateUrl: './closed-license-list.component.html',
  styleUrls: ['./closed-license-list.component.css']
})
export class ClosedLicenseListComponent implements OnInit {
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};

  constructor(private closedLicenseService: ClosedLicenseService,
              private ownerService: OwnerService) { }

  onSearch(closedLicenses) {
    this.closedLicenses = closedLicenses;
  }

  ngOnInit() {
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => { this.closedLicenses = closedLicenses;
        closedLicenses.forEach( closedLicense => {
        this.ownerService.getOwner(closedLicense._links.owner.href).subscribe(
          owner => {
            this.licenseOwners[closedLicense.uri] = owner.getUserName();
          });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
