import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { OpenLicense } from '../open-license';
import { OpenLicenseService } from '../open-license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-license-form',
  templateUrl: './open-license-form.component.html',
  styleUrls: ['./open-license-form.component.css']
})
export class OpenLicenseFormComponent implements OnInit {
  public openLicense: OpenLicense;
  public openLicenseForm: FormGroup;
  public textCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private licenseService: OpenLicenseService) {
    this.openLicenseForm = fb.group({
      'text': ['License text', Validators.required]
    });
    this.textCtrl = this.openLicenseForm.controls['text'];
    this.openLicense = new OpenLicense();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.licenseService.addOpenLicense(this.openLicense)
      .subscribe(
        openLicense => { this.router.navigate([openLicense.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
