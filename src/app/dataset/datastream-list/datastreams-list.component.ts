/**
 * Created by SergiGrau on 3/6/17.
 */


import { Component, OnInit } from '@angular/core';
import { DataStream } from '../datastream/datastream';
import { DataStreamService } from '../datastream/datastream.service';

@Component({
  selector: 'app-datastreams-list',
  templateUrl: './datastreams-list.component.html'
})
export class DatastreamsListComponent implements OnInit {
  public datastreams: DataStream[] = [];
  public errorMessage: string;

  constructor(private datastreamService: DataStreamService) {
  }

  onSearch(datastreams) {
    this.datastreams = datastreams;
  }

  ngOnInit() {
    this.datastreamService.getAllDataStreamsOrderedByTitle().subscribe(
      datastreams => {
        this.datastreams = datastreams;
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
