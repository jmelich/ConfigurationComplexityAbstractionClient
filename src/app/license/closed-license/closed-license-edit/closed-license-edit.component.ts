import { Component, OnInit } from '@angular/core';
import { ClosedLicense } from '../closed-license';
import { ActivatedRoute } from '@angular/router';
import { ClosedLicenseService } from '../closed-license.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-closed-license-edit',
  templateUrl: './closed-license-edit.component.html',
  styleUrls: ['./closed-license-edit.component.css']
})
export class ClosedLicenseEditComponent implements OnInit {
  public closedLicense: ClosedLicense = new ClosedLicense();
  public errorMessage: string;
  public closedLicenseForm: FormGroup;
  public textCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private closedLicenseService: ClosedLicenseService,
              private router: Router) {
    this.closedLicenseForm = fb.group({
      'text': ['ClosedLicense text', Validators.required],
      'price': ['ClosedLicense price', Validators.required]
    });
    this.textCtrl = this.closedLicenseForm.controls['text'];
    this.textCtrl = this.closedLicenseForm.controls['price'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/closedLicenses/${id}`;
        this.closedLicenseService.getClosedLicense(uri).subscribe(
          closedLicense => this.closedLicense = closedLicense,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.closedLicenseService.updateClosedLicense(this.closedLicense)
      .subscribe(
        closedLicense => { this.router.navigate([closedLicense.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
