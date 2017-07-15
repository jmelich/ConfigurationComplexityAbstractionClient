import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Card } from '../card';
import { CardService } from '../card.service';
import { Router } from '@angular/router';
import { EquipmentService } from '../../equipment/equipment.service';
import {Equipment} from '../../equipment/equipment';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  public card: Card;
  public equipments: Equipment[] = [];
  public cardForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private equipmentService: EquipmentService,
              private cardService: CardService) {
    this.cardForm = fb.group({
      'title': ['Card title', Validators.required],
      'description' : ['Card description'],
      'isInEquipment'  : ['Card equipment']
    });
    this.titleCtrl = this.cardForm.controls['title'];
    this.card = new Card();
  }

  ngOnInit() {
    this.equipmentService.getAllEquipments().subscribe(
      equipments => { this.equipments = equipments; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.cardService.addCard(this.card)
      .subscribe(
        card => { this.router.navigate([card.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.card.uri);
  }
}
