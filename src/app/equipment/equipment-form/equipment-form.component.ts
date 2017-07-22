import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Equipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { Router } from '@angular/router';
import { DealerService } from '../../dealer/dealer.service';
import {Dealer} from '../../dealer/dealer';

import { UpdateEquipmentService } from '../update.equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {
  public equipment: Equipment;
  @Input() dealer:  Dealer;
  public dealers: Dealer[] = [];
  public equipmentForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dealerService: DealerService,
              private updateService: UpdateEquipmentService,
              private equipmentService: EquipmentService) {
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
    this.equipment = new Equipment();
  }

  ngOnInit() {
    this.dealerService.getAllDealers().subscribe(
      dealers => { this.dealers = dealers; },
      error => this.errorMessage = <any>error.message
    );
    if (this.dealer) {
      this.equipment.isInDealer = this.dealer.uri;
      this.equipmentForm.get('isInDealer').disable();
    }
  }

  onSubmit(): void {
    this.equipmentService.addEquipment(this.equipment)
      .subscribe(
        equipment => {
          this.updateService.announceEquipment(equipment);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.equipment.uri);
    this.equipment = new Equipment;
    this.equipment.isInDealer = this.dealer.uri;
  }
}
