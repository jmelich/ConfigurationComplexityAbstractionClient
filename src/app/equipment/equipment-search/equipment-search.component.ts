import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Equipment} from '../equipment';
import {EquipmentService} from '../equipment.service';

@Component({
  selector: 'app-equipment-search',
  templateUrl: 'equipment-search.component.html',
  styleUrls: ['equipment-search.component.css']
})
export class EquipmentSearchComponent {
  @Input()
  equipments: Equipment[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private equipment: string = null;

  public errorMessage: string;

  constructor(private equipmentService: EquipmentService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.equipment = `/equipments/${id}`; }
      });
    this.equipmentService.getEquipmentsByTitleContaining(searchTerm).subscribe(
      equipments => {
        // Send to output emitter
        this.onSearchited.emit(equipments);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
