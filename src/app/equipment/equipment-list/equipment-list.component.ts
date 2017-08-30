import {Component, Input, OnInit} from '@angular/core';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';
import { EquipmentRoom } from '../../equipmentRoom/equipmentRoom';

import { UpdateEquipmentService } from '../update.equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  public equipments: Equipment[] = [];
  @Input() equipmentRoom: EquipmentRoom;
  public errorMessage: string;

  constructor(private equipmentService: EquipmentService,
              private updateService: UpdateEquipmentService) {
    updateService.addedEquipment$.subscribe(
      equipment => {
        this.equipments.push(equipment);
      }
    );
  }

  onSearch(equipments) {
    this.equipments = equipments;
  }

  ngOnInit() {
    if (this.equipmentRoom !== undefined) {
      this.equipmentService.getEquipmentsOfEquipmentRoom(this.equipmentRoom.uri).subscribe(
        equipments => { this.equipments = equipments; },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.equipmentService.getAllEquipments().subscribe(
        equipments => { this.equipments = equipments; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
