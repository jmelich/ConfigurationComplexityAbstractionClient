import { Component, OnInit } from '@angular/core';
import { EquipmentRoom } from '../equipmentRoom';
import { ActivatedRoute } from '@angular/router';
import { EquipmentRoomService } from '../equipmentRoom.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FloorService } from '../../floor/floor.service';
import { Floor } from '../../floor/floor';


@Component({
  selector: 'app-equipmentRoom-edit',
  templateUrl: './equipmentRoom-edit.component.html',
  styleUrls: ['./equipmentRoom-edit.component.css']
})
export class EquipmentRoomEditComponent implements OnInit {
  public equipmentRoom: EquipmentRoom = new EquipmentRoom();
  public floors: Floor[] = [];
  public floor: Floor = new Floor();
  public errorMessage: string;
  public equipmentRoomForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private equipmentRoomService: EquipmentRoomService,
              private floorService: FloorService,
              private router: Router) {
    this.equipmentRoomForm = fb.group({
      'title': ['EquipmentRoom title', Validators.required],
      'description' : ['EquipmentRoom description'],
      'isInFloor'  : ['EquipmentRoom floor']
    });
    this.titleCtrl = this.equipmentRoomForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/equipmentRooms/${id}`;
        this.equipmentRoomService.getEquipmentRoom(uri).subscribe(
          equipmentRoom => {
            this.equipmentRoom = equipmentRoom;
            const uri_floor = `/equipmentRooms/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.floorService.getAllFloors().subscribe(
      floors => { this.floors = floors; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.equipmentRoomService.updateEquipmentRoom(this.equipmentRoom)
      .subscribe(
        equipmentRoom => { this.router.navigate([equipmentRoom.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
