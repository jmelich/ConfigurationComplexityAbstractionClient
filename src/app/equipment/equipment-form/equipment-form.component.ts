import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Equipment } from '../equipment';
import { EquipmentService } from '../equipment.service';
import { EquipmentRoomService } from '../../equipmentRoom/equipmentRoom.service';
import { EquipmentRoom } from '../../equipmentRoom/equipmentRoom';
import { UpdateEquipmentService } from '../update.equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {
  public equipment: Equipment;
  @Input() equipmentRoom:  EquipmentRoom;
  public equipmentRooms: EquipmentRoom[] = [];
  public equipmentForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private equipmentRoomService: EquipmentRoomService,
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
      'isInEquipmentRoom'  : ['Equipment equipmentRoom']
    });
    this.titleCtrl = this.equipmentForm.controls['title'];
    this.equipment = new Equipment();
  }

  ngOnInit() {
    this.equipmentRoomService.getAllEquipmentRooms().subscribe(
      equipmentRooms => { this.equipmentRooms = equipmentRooms; },
      error => this.errorMessage = <any>error.message
    );
    if (this.equipmentRoom) {
      this.equipment.isInEquipmentRoom = this.equipmentRoom.uri;
      this.equipmentForm.get('isInEquipmentRoom').disable();
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
    this.equipment = new Equipment;
    if (this.equipmentRoom) {
      this.equipment.isInEquipmentRoom = this.equipmentRoom.uri;
    }
  }
}
