import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dealer } from '../dealer';
import { DealerService } from '../dealer.service';
import { FloorService } from '../../floor/floor.service';
import { Floor } from '../../floor/floor';
import { UpdateDealerService } from '../update.dealer.service';

@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.css']
})
export class DealerFormComponent implements OnInit {
  @Input() floor: Floor;
  public dealer: Dealer;
  public floors: Floor[] = [];
  public dealerForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private dealerService: DealerService,
              private updateService: UpdateDealerService,
              private floorService: FloorService) {
    this.dealerForm = fb.group({
      'title': ['Dealer title', Validators.required],
      'description' : ['Dealer description'],
      'isInFloor'  : ['Dealer floor']
    });
    this.titleCtrl = this.dealerForm.controls['title'];
    this.dealer = new Dealer();
  }

  ngOnInit() {
    this.floorService.getAllFloors().subscribe(
      floors => {
        this.floors = floors;
        },
      error => this.errorMessage = <any>error.message
    );
    if (this.floor) {
      this.dealer.isInFloor = this.floor.uri;
      this.dealerForm.get('isInFloor').disable();
    }
  }

  onSubmit(): void {
    this.dealerService.addDealer(this.dealer)
      .subscribe(
        dealer => {
          this.updateService.announceDealer(dealer);
          this.showForm = false;
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    this.dealer = new Dealer();
    if (this.floor) {
      this.dealer.isInFloor = this.floor.uri;
    }
  }
}
