import { Component, OnInit } from '@angular/core';
import { Dealer } from '../dealer';
import { ActivatedRoute } from '@angular/router';
import { DealerService } from '../dealer.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {FloorService} from '../../floor/floor.service';
import {Floor} from '../../floor/floor';


@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.css']
})
export class DealerEditComponent implements OnInit {
  public dealer: Dealer = new Dealer();
  public floors: Floor[] = [];
  public floor: Floor = new Floor();
  public errorMessage: string;
  public dealerForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private dealerService: DealerService,
              private floorService: FloorService,
              private router: Router) {
    this.dealerForm = fb.group({
      'title': ['Dealer title', Validators.required],
      'description' : ['Dealer description'],
      'isInFloor'  : ['Dealer floor']
    });
    this.titleCtrl = this.dealerForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dealers/${id}`;
        this.dealerService.getDealer(uri).subscribe(
          dealer => {
            this.dealer = dealer;
            const uri_floor = `/dealers/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.floorService.getAllFloors().subscribe(
      floors => { this.floors = floors; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.dealerService.updateDealer(this.dealer)
      .subscribe(
        dealer => { this.router.navigate([dealer.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
