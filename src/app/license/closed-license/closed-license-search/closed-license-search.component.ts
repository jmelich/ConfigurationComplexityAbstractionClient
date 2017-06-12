import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ClosedLicenseService} from '../closed-license.service';
import {ClosedLicense} from '../closed-license';

@Component({
  selector: 'app-closed-license-search',
  templateUrl: 'closed-license-search.component.html',
  styleUrls: ['closed-license-search.component.css']
})
export class ClosedLicenseSearchComponent {
  @Input()
  closedLicenses: ClosedLicense[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;

  constructor(private closedLicenseService: ClosedLicenseService) {
  }

  performSearch(searchTerm: string): void {
    this.closedLicenseService.getClosedLicenseByTextWords(searchTerm).subscribe(
      closedLicenses => {
        // Send to output emitter
        this.onSearchited.emit(closedLicenses);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
