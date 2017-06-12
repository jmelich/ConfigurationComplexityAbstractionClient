import {Component, OnInit} from '@angular/core';
import {Tag} from '../tag';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tags-edit.component.html',
  styleUrls: ['./tags-edit.component.css']
})

export class TagEditComponent implements OnInit {
  public tag: Tag = new Tag();
  public errorMessage: string;
  public tagForm: FormGroup;
  public nameCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private tagService: TagService,
              private router: Router) {
    this.tagForm = fb.group({
      'name': ['Tag name', Validators.required]
    });
    this.nameCtrl = this.tagForm.controls['name'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/tags/${id}`;
        this.tagService.getTag(uri).subscribe(
          tag => this.tag = tag,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.tagService.updateTag(this.tag)
      .subscribe(
        tag => { this.router.navigate([tag.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
