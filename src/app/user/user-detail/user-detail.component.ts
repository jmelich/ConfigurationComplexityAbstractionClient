import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
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
  }
}
