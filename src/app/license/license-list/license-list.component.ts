import {Component, OnInit} from '@angular/core';
import {OpenLicenseService} from '../open-license/open-license.service';
import {ClosedLicenseService} from '../closed-license/closed-license.service';
import {OpenLicense} from '../open-license/open-license';
import {ClosedLicense} from '../closed-license/closed-license';
import {OwnerService} from '../../user/owner.service';

/**
 * Created by ElTrioMaquinero on 5/25/17.
 */

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html'
})
export class LicenseListComponent implements OnInit {
  public licenses: any[] = [];
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;
  public licenseOwners: {} = {};

  constructor(private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private ownerService: OwnerService) {
  }

  onSearch(openLicense) {
    this.licenses = openLicense;
  }

  checkType(type) {
    return type instanceof OpenLicense;
  }

  ngOnInit() {
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicense => {
        this.openLicenses = openLicense;
        openLicense.forEach(openLicenses => {
            this.ownerService.getOwner(openLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[openLicenses.uri] = owner.getUserName();
              });
            this.licenses.push(openLicenses);
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );

    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicense => {
        this.closedLicenses = closedLicense;
        closedLicense.forEach(closedLicenses => {
            this.ownerService.getOwner(closedLicenses._links.owner.href).subscribe(
              owner => {
                this.licenseOwners[closedLicenses.uri] = owner.getUserName();
              });
            this.licenses.push(closedLicenses);
          }
        );
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
