import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../equipment.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {DealerService} from '../../dealer/dealer.service';
import {Dealer} from '../../dealer/dealer';


@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {
  public equipment: Equipment = new Equipment();
  public dealers: Dealer[] = [];
  public dealer: Dealer = new Dealer();
  public errorMessage: string;
  public equipmentForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private equipmentService: EquipmentService,
              private dealerService: DealerService,
              private router: Router) {
    this.equipmentForm = fb.group({
      'title': ['Equipment title', Validators.required],
      'description' : ['Equipment description'],
      'numberOfPorts' : ['Number of ports'],
      'ip' : ['IP address'],
      'username' : ['Equipment username'],
      'password' : ['Equipment password'],
      'positionInStack' : ['Position in stack'],
      'isInDealer'  : ['Equipment dealer']
    });
    this.titleCtrl = this.equipmentForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/equipments/${id}`;
        this.equipmentService.getEquipment(uri).subscribe(
          equipment => {
            this.equipment = equipment;
            const uri_dealer = `/equipments/${id}/isInDealer`;
            this.dealerService.getDealer(uri_dealer).subscribe(
              dealer => this.dealer = dealer
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.dealerService.getAllDealers().subscribe(
      dealers => { this.dealers = dealers; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.equipmentService.updateEquipment(this.equipment)
      .subscribe(
        equipment => { this.router.navigate([equipment.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
