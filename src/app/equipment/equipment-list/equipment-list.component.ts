import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  public equipments: Equipment[] = [];
  public errorMessage: string;

  constructor(private equipmentService: EquipmentService) { }

  onSearch(equipments) {
    this.equipments = equipments;
  }

  ngOnInit() {
    this.equipmentService.getAllEquipments().subscribe(
      equipments => { this.equipments = equipments; },
      error => this.errorMessage = <any>error.message
    );
  }
}
