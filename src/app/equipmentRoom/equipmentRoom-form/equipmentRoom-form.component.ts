import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EquipmentRoom } from '../equipmentRoom';
import { EquipmentRoomService } from '../equipmentRoom.service';
import { FloorService } from '../../floor/floor.service';
import { Floor } from '../../floor/floor';
import { UpdateEquipmentRoomService } from '../update.equipmentRoom.service';

@Component({
  selector: 'app-equipmentRoom-form',
  templateUrl: './equipmentRoom-form.component.html',
  styleUrls: ['./equipmentRoom-form.component.css']
})
export class EquipmentRoomFormComponent implements OnInit {
  @Input() floor: Floor;
  public equipmentRoom: EquipmentRoom;
  public floors: Floor[] = [];
  public equipmentRoomForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private equipmentRoomService: EquipmentRoomService,
              private updateService: UpdateEquipmentRoomService,
              private floorService: FloorService) {
    this.equipmentRoomForm = fb.group({
      'title': ['EquipmentRoom title', Validators.required],
      'description' : ['EquipmentRoom description'],
      'isInFloor'  : ['EquipmentRoom floor']
    });
    this.titleCtrl = this.equipmentRoomForm.controls['title'];
    this.equipmentRoom = new EquipmentRoom();
  }

  ngOnInit() {
    this.floorService.getAllFloors().subscribe(
      floors => {
        this.floors = floors;
        },
      error => this.errorMessage = <any>error.message
    );
    if (this.floor) {
      this.equipmentRoom.isInFloor = this.floor.uri;
      this.equipmentRoomForm.get('isInFloor').disable();
    }
  }

  onSubmit(): void {
    this.equipmentRoomService.addEquipmentRoom(this.equipmentRoom)
      .subscribe(
        equipmentRoom => {
          this.updateService.announceEquipmentRoom(equipmentRoom);
          this.showForm = false;
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    this.equipmentRoom = new EquipmentRoom();
    if (this.floor) {
      this.equipmentRoom.isInFloor = this.floor.uri;
    }
  }
}
