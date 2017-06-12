import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClosedLicense } from '../closed-license';
import { ClosedLicenseService } from '../closed-license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closed-license-form',
  templateUrl: './closed-license-form.component.html',
  styleUrls: ['./closed-license-form.component.css']
})
export class ClosedLicenseFormComponent implements OnInit {
  public closedLicense: ClosedLicense;
  public closedLicenseForm: FormGroup;
  public textCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private licenseService: ClosedLicenseService) {
    this.closedLicenseForm = fb.group({
      'text': ['License text', Validators.required],
      'price': ['License price']
    });
    this.textCtrl = this.closedLicenseForm.controls['text'];
    this.closedLicense = new ClosedLicense();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.licenseService.addClosedLicense(this.closedLicense)
      .subscribe(
        closedLicense => { this.router.navigate([closedLicense.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
