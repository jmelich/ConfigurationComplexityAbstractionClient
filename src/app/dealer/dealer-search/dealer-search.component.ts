import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Dealer} from '../dealer';
import {DealerService} from '../dealer.service';
import {Floor} from '../../floor/floor';

@Component({
  selector: 'app-dealer-search',
  templateUrl: 'dealer-search.component.html',
  styleUrls: ['dealer-search.component.css']
})
export class DealerSearchComponent {
  @Input()  dealers: Dealer[];
  @Input()  floor: Floor;
  @Output()  onSearchited: EventEmitter<any> = new EventEmitter();
  private dealer: string = null;

  public errorMessage: string;

  constructor(private dealerService: DealerService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.dealer = `/dealers/${id}`; }
      });
    if (this.floor !== undefined) {
      this.dealerService.getDealersByTitleContainingAndInFloor(searchTerm, this.floor).subscribe(
        dealers => {
          // Send to output emitter
          this.onSearchited.emit(dealers);
        },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.dealerService.getDealersByTitleContaining(searchTerm).subscribe(
        dealers => {
          // Send to output emitter
          this.onSearchited.emit(dealers);
        },
        error => this.errorMessage = <any>error.message
      );
    }

  }

}
