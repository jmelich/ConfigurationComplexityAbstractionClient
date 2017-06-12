import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OpenLicenseService} from '../open-license.service';
import {OpenLicense} from '../open-license';

@Component({
  selector: 'app-open-license-search',
  templateUrl: 'open-license-search.component.html',
  styleUrls: ['open-license-search.component.css']
})
export class OpenLicenseSearchComponent {
  @Input()
  openLicenses: OpenLicense[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;

  constructor(private openLicenseService: OpenLicenseService) { }

  performSearch(searchTerm: string): void {
    this.openLicenseService.getOpenLicenseByTextWords(searchTerm).subscribe(
      openLicenses => {
        // Send to output emitter
        this.onSearchited.emit(openLicenses);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
