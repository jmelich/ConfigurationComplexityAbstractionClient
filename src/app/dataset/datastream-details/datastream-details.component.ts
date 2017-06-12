/**
 * Created by SergiGrau on 3/6/17.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStreamService } from '../datastream/datastream.service';
import { DataStream } from '../datastream/datastream';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { SchemaService } from '../../schema/schema.service';
import { Schema } from '../../schema/schema';
import { OwnerService } from '../../user/owner.service';

declare const require: any;

@Component({
    selector: 'app-datastream-details',
    templateUrl: './datastream-details.component.html'
})
export class DatastreamDetailsComponent implements OnInit {
  public datastream: DataStream = new DataStream();
  public schema: Schema = new Schema();
  public errorMessage: string;
  public isOwner: boolean;
  public ownerName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datastreamService: DataStreamService,
              private authenticationService: AuthenticationBasicService,
              private datasetOwnerService: OwnerService,
              private schemaService: SchemaService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataStreams/${id}`;
        this.datastreamService.getDataStream(uri).subscribe(
          datastream => {
            this.datastream = datastream;
            if (this.datastream._links != null) {
              this.datasetOwnerService.getOwner(this.datastream._links.owner.href).subscribe(
                owner => {
                  this.ownerName = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
            const uri_schema = `/datasets/${id}/schema`;
            this.schemaService.getSchema(uri_schema).subscribe(
              schema => {
                this.schema = schema;
              });
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDelete(datastream) {
    this.datastreamService.deleteDataStream(datastream).subscribe(
      response => {
        this.router.navigate(['/dataStreams']);
      },
      error => this.errorMessage = <any>error.message,
    );
  }
}
