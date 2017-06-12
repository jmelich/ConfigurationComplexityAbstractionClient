import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.css']
})
export class TagFormComponent implements OnInit {
  public tag: Tag;
  public tagForm: FormGroup;
  public nameCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tagService: TagService) {
    this.tagForm = fb.group({
      'name': ['Tag name', Validators.required]
    });
    this.nameCtrl = this.tagForm.controls['name'];
    this.tag = new Tag();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.tagService.addTag(this.tag)
      .subscribe(
        tag => { this.router.navigate([tag.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }

  // TODO: Need to fix testing erros at creating tags

}
