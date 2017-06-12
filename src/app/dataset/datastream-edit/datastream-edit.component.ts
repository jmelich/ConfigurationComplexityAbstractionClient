/**
 * Created by SergiGrau on 3/6/17.
 */

import { Component, OnInit } from '@angular/core';
import { DataStream } from '../datastream/datastream';
import { ActivatedRoute } from '@angular/router';
import { DataStreamService } from '../datastream/datastream.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datastream-edit',
  templateUrl: './datastream-edit.component.html',
  styleUrls: ['./datastream-edit.component.css']
})
export class DatastreamEditComponent implements OnInit {
  public datastream: DataStream = new DataStream();
  public errorMessage: string;
  public dataStreamForm: FormGroup;
  public titleCtrl: AbstractControl;
  public streamAttached = false;
  public streamname: string;
  public content: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private dataStreamService: DataStreamService,
              private router: Router) {
    this.dataStreamForm = fb.group({
      'title': ['DataStream title', Validators.required],
      'description': ['DataStream description'],
      'streamname': ['DataStream name']
    });
    this.titleCtrl = this.dataStreamForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataStreams/${id}`;
        this.dataStreamService.getDataStream(uri).subscribe(
          datastream => this.datastream = datastream,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    if (this.streamAttached) {
      this.datastream.streamname = this.streamname;
      this.datastream.content = this.content;
    }

    this.dataStreamService.updateDataStream(this.datastream)
      .subscribe(
        datastream => {
          this.router.navigate([datastream.uri]);
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }

  addDataStream(event): void {
  }
}
