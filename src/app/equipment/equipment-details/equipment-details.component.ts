import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../equipment.service';
import { Equipment } from '../equipment';
import { EquipmentRoomService } from '../../equipmentRoom/equipmentRoom.service';
import { EquipmentRoom } from '../../equipmentRoom/equipmentRoom';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
  public equipment: Equipment = new Equipment();
  public equipmentRoom: EquipmentRoom = new EquipmentRoom();
  public errorMessage: string;
  public showChildForm: any = false;

  constructor(private route: ActivatedRoute,
              private _location: Location,
              private equipmentService: EquipmentService,
              private equipmentRoomService: EquipmentRoomService,
              public toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/equipments/${id}`;
        this.equipmentService.getEquipment(uri).subscribe(
          equipment => {
            this.equipment = equipment;

            const uri_equipmentRoom = `/equipments/${id}/isInEquipmentRoom`;
            this.equipmentRoomService.getEquipmentRoom(uri_equipmentRoom).subscribe(
              equipmentRoom => this.equipmentRoom = equipmentRoom
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }
  onDelete(): void {
    this.equipmentService.deleteEquipment(this.equipment)
      .subscribe(
        response => { this._location.back(); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          this.toastr.error('Delete dependent entities before');
        });
  }
}
