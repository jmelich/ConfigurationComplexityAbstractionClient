import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetService } from './dataset/dataset.service';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { DatasetsListComponent } from './dataset/datasets-list/datasets-list.component';
import { DatasetDetailsComponent } from './dataset/dataset-details/dataset-details.component';
import { SchemaFormComponent } from './schema/schema-form/schema-form.component';
import { SchemasListComponent } from './schema/schemas-list/schemas-list.component';
import { SchemaDetailsComponent } from './schema/schema-details/schema-details.component';
import { SchemaService } from './schema/schema.service';
import { DatafilesSearchComponent } from './dataset/datafile-search/datafile-search.component';
import { DatasetsSearchComponent} from './dataset/dataset-search/dataset-search.component';
import { TagsSearchComponent} from './tag/tags-search/tags-search.component';
import { DatasetEditComponent } from './dataset/dataset-edit/dataset-edit.component';
import { OpenLicenseFormComponent } from './license/open-license/open-license-form/open-license-form.component';
import { OpenLicenseListComponent } from './license/open-license/open-license-list/open-license-list.component';
import { OpenLicenseDetailsComponent } from './license/open-license/open-license-details/open-license-details.component';
import { OpenLicenseService } from './license/open-license/open-license.service';
import { SchemaSearchComponent } from './schema/schemas-search/schemas-search.component';
import { ClosedLicenseFormComponent } from './license/closed-license/closed-license-form/closed-license-form.component';
import { ClosedLicenseListComponent } from './license/closed-license/closed-license-list/closed-license-list.component';
import { ClosedLicenseDetailsComponent } from './license/closed-license/closed-license-details/closed-license-details.component';
import { ClosedLicenseService } from './license/closed-license/closed-license.service';
import { OpenLicenseSearchComponent } from './license/open-license/open-license-search/open-license-search.component';
import { ClosedLicenseSearchComponent } from './license/closed-license/closed-license-search/closed-license-search.component';
import { TagService } from './tag/tag.service';
import { TagDetailsComponent } from './tag/tags-details/tags-details.component';
import { TagsListComponent } from './tag/tags-list/tags-list.component';
import { TagFormComponent } from './tag/tags-form/tags-form.component';
import { FieldService } from './field/field.service';
import { FieldDetailsComponent } from './field/field-details/field-details.component';
import { FieldFormComponent } from './field/field-form/field-form.component';
import { FieldListComponent } from './field/fields-list/fields-list.component';
import { FieldEditComponent } from './field/field-edit/field-edit.component';
import { FieldSearchComponent } from './field/field-search/fields-search.component';
import { SchemaEditComponent } from './schema/schema-edit/schema-edit.component';
import { DataFileService } from './dataset/datafile/datafile.service';
import { DatafilesListComponent } from './dataset/datafile-list/datafiles-list.component';
import { DatafileDetailsComponent } from './dataset/datafile-list/datafile-details.component';
import { SchemasDatasetListComponent } from './schema/schemas-list/schemas-dataset-list.component';
import { OpenLicenseEditComponent } from './license/open-license/open-license-edit/open-license-edit.component';
import { ClosedLicenseEditComponent } from './license/closed-license/closed-license-edit/closed-license-edit.component';
import { ClosedLicenseDatasetListComponent } from './license/closed-license/closed-license-list/closed-license-list-dataset.component';
import { OpenLicenseDatasetListComponent } from './license/open-license/open-license-list/open-license-list-dataset.component';
import { DataFileEditComponent } from './dataset/datafile-edit/datafile-edit.component';
import { TagEditComponent } from './tag/tags-edit/tags-edit.component';
import { OwnerService } from './user/owner.service';
import { UserService } from './user/user.service';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CommentDetailsComponent } from './comment/comment-details/comment-details.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { CommentFormComponent } from './comment/comment-form/comment-form.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentSearchComponent } from './comment/comment-search/comment-search.component';
import { CommentService } from './comment/comment.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LicenseListComponent } from './license/license-list/license-list.component';
import { DataStreamService } from './dataset/datastream/datastream.service';
import { DatastreamsSearchComponent } from './dataset/datastream-search/datastream-search.component';
import { DatastreamsListComponent } from './dataset/datastream-list/datastreams-list.component';
import { DatastreamDetailsComponent } from './dataset/datastream-details/datastream-details.component';
import { DatastreamEditComponent } from './dataset/datastream-edit/datastream-edit.component';
import {CampusListComponent} from './campus/campus-list/campus-list.component';
import {CampusService} from "./campus/campus.service";
import {CampusFormComponent} from "./campus/campus-form/campus-form.component";
import {CampusDetailsComponent} from "./campus/campus-details/campus-details.component";
import {CampusEditComponent} from "./campus/campus-edit/campus-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    DatasetFormComponent,
    AboutComponent,
    DatasetsListComponent,
    DatafilesListComponent,
    DatasetDetailsComponent,
    SchemaFormComponent,
    SchemasListComponent,
    SchemaDetailsComponent,
    DatasetsSearchComponent,
    DatafilesSearchComponent,
    TagsSearchComponent,
    DatasetEditComponent,
    OpenLicenseFormComponent,
    OpenLicenseListComponent,
    OpenLicenseDetailsComponent,
    SchemaSearchComponent,
    ClosedLicenseFormComponent,
    ClosedLicenseListComponent,
    ClosedLicenseDetailsComponent,
    OpenLicenseSearchComponent,
    ClosedLicenseSearchComponent,
    TagDetailsComponent,
    TagsListComponent,
    TagFormComponent,
    TagEditComponent,
    SchemaEditComponent,
    UserDetailComponent,
    CommentDetailsComponent,
    CommentEditComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentSearchComponent,
    DatafileDetailsComponent,
    SchemasDatasetListComponent,
    FieldDetailsComponent,
    FieldFormComponent,
    FieldListComponent,
    FieldEditComponent,
    FieldSearchComponent,
    SchemasDatasetListComponent,
    OpenLicenseEditComponent,
    ClosedLicenseEditComponent,
    SchemaEditComponent,
    ClosedLicenseDatasetListComponent,
    OpenLicenseDatasetListComponent,
    DataFileEditComponent,
    LicenseListComponent,
    DataFileEditComponent,
    DatastreamEditComponent,
    DatastreamDetailsComponent,
    DatastreamsListComponent,
    DatastreamsSearchComponent,
    CampusListComponent,
    CampusFormComponent,
    CampusDetailsComponent,
    CampusEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginBasicModule,
    PaginationModule.forRoot()
  ],
  providers: [AuthenticationBasicService, LoggedInGuard, DatasetService, SchemaService,
              OpenLicenseService, ClosedLicenseService, TagService, OwnerService, DataFileService, UserService,
              FieldService, CommentService, OwnerService, DataStreamService, CampusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
