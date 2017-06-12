import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from '../tag.service';
import { Tag } from '../tag';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {Dataset} from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tags-details.component.html',
  styleUrls: ['./tags-details.component.css']
})
export class TagDetailsComponent implements OnInit {
  public tag: Tag = new Tag();
  public errorMessage: string;
  public datasets: Dataset[] = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService,
              private datasetService: DatasetService,
              private authenticationService: AuthenticationBasicService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/tags/${id}`;
        this.tagService.getTag(uri).subscribe(
          tag => {
            this.tag = tag;
            this.datasetService.getDatasetsByTag(id).subscribe(
                datasets => this.datasets = datasets
            );
          },
        error => this.errorMessage = <any>error.message
        );
      });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  onDelete(tag) {
    this.tagService.deleteTag(tag).subscribe(
      response => { this.router.navigate(['/tags']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
