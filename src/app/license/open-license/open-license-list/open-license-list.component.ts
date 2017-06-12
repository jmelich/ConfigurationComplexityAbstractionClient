import { Component, OnInit } from '@angular/core';
import { OpenLicenseService } from '../open-license.service';
import { OpenLicense } from '../open-license';
import { OwnerService } from '../../../user/owner.service';

@Component({
  selector: 'app-open-license-list',
  templateUrl: './open-license-list.component.html',
  styleUrls: ['./open-license-list.component.css']
})
export class OpenLicenseListComponent implements OnInit {
  public openLicenses: OpenLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};

  constructor(private openLicenseService: OpenLicenseService,
              private ownerService: OwnerService) { }

  onSearch(openLicense) {
    this.openLicenses = openLicense;
  }

  ngOnInit() {
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicense => { this.openLicenses = openLicense;
      openLicense.forEach( openLicenses => {
        this.ownerService.getOwner(openLicenses._links.owner.href).subscribe(
          owner => {
            this.licenseOwners[openLicenses.uri] = owner.getUserName();
          });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
