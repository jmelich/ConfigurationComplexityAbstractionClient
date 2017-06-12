import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClosedLicenseService } from '../closed-license.service';
import { ClosedLicense } from '../closed-license';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { OwnerService } from '../../../user/owner.service';

@Component({
  selector: 'app-closed-license-details',
  templateUrl: './closed-license-details.component.html',
  styleUrls: ['./closed-license-details.component.css']
})
export class ClosedLicenseDetailsComponent implements OnInit {
  public closedLicense: ClosedLicense = new ClosedLicense();
  public errorMessage: string;
  public isOwner: boolean;
  public ownerName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private closedLicenseService: ClosedLicenseService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/closedLicenses/${id}`;
        this.closedLicenseService.getClosedLicense(uri).subscribe(
          closedLicense => {
            this.closedLicense = closedLicense;
            if (this.closedLicense._links != null) {
              this.ownerService.getOwner(this.closedLicense._links.owner.href).subscribe(
                owner => {
                  this.ownerName = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
              });
            }
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }

  onDelete(closedLicense) {
    this.closedLicenseService.deleteClosedLicense(closedLicense).subscribe(
      response => { this.router.navigate(['/closedLicenses']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
