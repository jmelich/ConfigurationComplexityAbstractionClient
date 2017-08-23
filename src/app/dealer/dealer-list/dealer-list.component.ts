import {Component, Input, OnInit} from '@angular/core';
import { DealerService } from '../dealer.service';
import { Dealer } from '../dealer';
import { Floor } from '../../floor/floor';
import { UpdateDealerService } from '../update.dealer.service';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.css']
})
export class DealerListComponent implements OnInit {
  public dealers: Dealer[] = [];
  @Input() floor: Floor;
  public errorMessage: string;

  constructor(private dealerService: DealerService,
              private updateService: UpdateDealerService) {
    updateService.addedDealer$.subscribe(
      dealer => {
        this.dealers.push(dealer);
      }
    );
  }

  onSearch(dealers) {
    this.dealers = dealers;
  }

  ngOnInit() {
    if (this.floor !== undefined) {
      this.dealerService.getDealersOfFloor(this.floor.uri).subscribe(
        dealers => { this.dealers = dealers; },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.dealerService.getAllDealers().subscribe(
        dealers => { this.dealers = dealers; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
