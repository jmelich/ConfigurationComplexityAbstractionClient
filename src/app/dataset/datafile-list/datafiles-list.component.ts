import { Component, OnInit } from '@angular/core';
import { DataFile } from '../datafile/datafile';
import { DataFileService } from '../datafile/datafile.service';

@Component({
  selector: 'app-datafiles-list',
  templateUrl: './datafiles-list.component.html'
})
export class DatafilesListComponent implements OnInit {
  public datafiles: DataFile[] = [];
  public errorMessage: string;

  constructor(private datafileService: DataFileService) { }

  onSearch(datafiles) {
    this.datafiles = datafiles;
  }

  ngOnInit() {
    this.datafileService.getAllDataFilesOrderedByTitle().subscribe(
      datafiles => { this.datafiles = datafiles; },
      error => this.errorMessage = <any>error.message
    );
  }
}
