import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {EquipmentService} from '../../equipment/equipment.service';
import {Equipment} from '../../equipment/equipment';


@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  public card: Card = new Card();
  public equipments: Equipment[] = [];
  public equipment: Equipment = new Equipment();
  public errorMessage: string;
  public cardForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cardService: CardService,
              private equipmentService: EquipmentService,
              private router: Router) {
    this.cardForm = fb.group({
      'title': ['Card title', Validators.required],
      'description' : ['Card description'],
      'isInEquipment'  : ['Card equipment']
    });
    this.titleCtrl = this.cardForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/cards/${id}`;
        this.cardService.getCard(uri).subscribe(
          card => {
            this.card = card;
            const uri_equipment = `/cards/${id}/isInEquipment`;
            this.equipmentService.getEquipment(uri_equipment).subscribe(
              equipment => this.equipment = equipment
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.equipmentService.getAllEquipments().subscribe(
      equipments => { this.equipments = equipments; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.cardService.updateCard(this.card)
      .subscribe(
        card => { this.router.navigate([card.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
