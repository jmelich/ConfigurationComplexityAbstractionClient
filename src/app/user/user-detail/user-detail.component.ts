import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {Dataset} from '../../dataset/dataset';
import {Schema} from '../../schema/schema';
import {OpenLicense} from '../../license/open-license/open-license';
import {ClosedLicense} from '../../license/closed-license/closed-license';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
  public datasets: Dataset[] = [];
  public schemas: Schema[] = [];
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataOwners/${id}`;
        const uri2 = `/dataUsers/${id}`;
        this.userService.getUser(uri).subscribe(
          user => {
            this.user = user;
            this.getUserInfo(user);
          },
          error => {
            this.userService.getUser(uri2).subscribe(
              user => {
                this.user = user;
                this.getUserInfo(user);
              },
              error2 => {
                this.errorMessage = <any>error2.message;
              }
            );
          }
        );
      });
  }

  getUserInfo (user: User): void {
    this.userService.getUserDatasets(user.uri + '/ownsDatasets').subscribe(
      datasets => {
        this.datasets = datasets;
      });

    this.userService.getUserSchemas(user.uri + '/ownsSchemas').subscribe(
      schemas => {
        this.schemas = schemas;
      });

    this.userService.getUserOpenLicenses(user.uri + '/ownsLicenses').subscribe(
      licenses => {
        this.openLicenses = licenses;
      });

    this.userService.getUserClosedLicenses(user.uri + '/ownsLicenses').subscribe(
      licenses => {
        this.closedLicenses = licenses;
      });
  }
}
