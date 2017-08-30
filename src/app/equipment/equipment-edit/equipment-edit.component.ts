import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../equipment.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentRoomService } from '../../equipmentRoom/equipmentRoom.service';
import { EquipmentRoom } from '../../equipmentRoom/equipmentRoom';


@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {
  public equipment: Equipment = new Equipment();
  public equipmentRooms: EquipmentRoom[] = [];
  public equipmentRoom: EquipmentRoom = new EquipmentRoom();
  public errorMessage: string;
  public equipmentForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private equipmentService: EquipmentService,
              private equipmentRoomService: EquipmentRoomService,
              private router: Router) {
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

    this.equipmentRoomService.getAllEquipmentRooms().subscribe(
      equipmentRooms => { this.equipmentRooms = equipmentRooms; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.equipmentService.updateEquipment(this.equipment)
      .subscribe(
        equipment => { this.router.navigate([equipment.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
