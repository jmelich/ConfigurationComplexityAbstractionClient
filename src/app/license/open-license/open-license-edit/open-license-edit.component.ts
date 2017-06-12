import { Component, OnInit } from '@angular/core';
import { OpenLicense } from '../open-license';
import { ActivatedRoute } from '@angular/router';
import { OpenLicenseService } from '../open-license.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-open-license-edit',
  templateUrl: './open-license-edit.component.html',
  styleUrls: ['./open-license-edit.component.css']
})
export class OpenLicenseEditComponent implements OnInit {
  public openLicense: OpenLicense = new OpenLicense();
  public errorMessage: string;
  public openLicenseForm: FormGroup;
  public textCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private openLicenseService: OpenLicenseService,
              private router: Router) {
    this.openLicenseForm = fb.group({
      'text': ['OpenLicense text', Validators.required]
    });
    this.textCtrl = this.openLicenseForm.controls['text'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/openLicenses/${id}`;
        this.openLicenseService.getOpenLicense(uri).subscribe(
          openLicense => this.openLicense = openLicense,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.openLicenseService.updateOpenLicense(this.openLicense)
      .subscribe(
        openLicense => { this.router.navigate([openLicense.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
