import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {OwnerService} from '../../user/owner.service';

@Component({
  selector: 'app-schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.css']
})
export class SchemaDetailsComponent implements OnInit {
  public schema: Schema = new Schema();
  public errorMessage: string;
  public isOwner: boolean;
  public ownerName: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private schemaService: SchemaService,
              private authenticationService: AuthenticationBasicService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.schemaService.getSchema(uri).subscribe(
          schema => {
            this.schema = schema;
            if (this.schema._links != null) {
              this.ownerService.getOwner(this.schema._links.owner.href).subscribe(
                owner => {
                  this.ownerName = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }

  onDelete(schema) {
    this.schemaService.deleteSchema(schema).subscribe(
      response => {
        this.router.navigate(['/schemas']);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
