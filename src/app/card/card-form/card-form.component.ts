import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Card } from '../card';
import { CardService } from '../card.service';
import { EquipmentService } from '../../equipment/equipment.service';
import { Equipment } from '../../equipment/equipment';

import { UpdateCardService } from '../update.card.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  @Input() equipment: Equipment;
  public card: Card;
  public equipments: Equipment[] = [];
  public cardForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private equipmentService: EquipmentService,
              private updateService: UpdateCardService,
              private cardService: CardService) {
    this.cardForm = fb.group({
      'title': ['Card title', Validators.required],
      'description' : ['Card description'],
      'isInEquipment'  : ['Card equipment'],
      'numberOfPorts' : ['Number of Ports'],
      'numberOfCard' : ['Number of Card'],
    });
    this.titleCtrl = this.cardForm.controls['title'];
    this.card = new Card();
  }

  ngOnInit() {
    this.equipmentService.getAllEquipments().subscribe(
      equipments => {
        this.equipments = equipments;
        if (this.equipment) {
          this.card.isInEquipment = this.equipment.uri;
          this.cardForm.get('isInEquipment').disable();
        }
        },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.cardService.addCard(this.card)
      .subscribe(
        card => {
          this.updateService.announceCard(card);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.card.uri);
    this.card = new Card;
    if (this.equipment) {
      this.card.isInEquipment = this.equipment.uri;
    }
  }
}
