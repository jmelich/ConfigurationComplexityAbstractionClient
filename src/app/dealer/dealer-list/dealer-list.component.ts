import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer.service';
import { Dealer } from '../dealer';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.css']
})
export class DealerListComponent implements OnInit {
  public dealers: Dealer[] = [];
  public errorMessage: string;

  constructor(private dealerService: DealerService) { }

  onSearch(dealers) {
    this.dealers = dealers;
  }

  ngOnInit() {
    this.dealerService.getAllDealers().subscribe(
      dealers => { this.dealers = dealers; },
      error => this.errorMessage = <any>error.message
    );
  }
}
