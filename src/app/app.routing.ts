import { Routes } from '@angular/router';
import { DatasetFormComponent } from './dataset/dataset-form/dataset-form.component';
import { AboutComponent } from './about/about.component';
import { DatasetDetailsComponent } from './dataset/dataset-details/dataset-details.component';
import { DatasetsListComponent } from './dataset/datasets-list/datasets-list.component';
import { SchemasListComponent } from './schema/schemas-list/schemas-list.component';
import { SchemaFormComponent } from './schema/schema-form/schema-form.component';
import { SchemaDetailsComponent } from './schema/schema-details/schema-details.component';
import { DatasetEditComponent } from './dataset/dataset-edit/dataset-edit.component';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { OpenLicenseListComponent } from './license/open-license/open-license-list/open-license-list.component';
import { OpenLicenseFormComponent } from './license/open-license/open-license-form/open-license-form.component';
import { OpenLicenseDetailsComponent } from './license/open-license/open-license-details/open-license-details.component';
import { ClosedLicenseListComponent } from './license/closed-license/closed-license-list/closed-license-list.component';
import { ClosedLicenseFormComponent } from './license/closed-license/closed-license-form/closed-license-form.component';
import { ClosedLicenseDetailsComponent } from './license/closed-license/closed-license-details/closed-license-details.component';
import { TagsListComponent } from './tag/tags-list/tags-list.component';
import { TagFormComponent } from './tag/tags-form/tags-form.component';
import { TagDetailsComponent } from './tag/tags-details/tags-details.component';
import { SchemaEditComponent} from './schema/schema-edit/schema-edit.component';
import { FieldListComponent } from './field/fields-list/fields-list.component';
import { FieldFormComponent } from './field/field-form/field-form.component';
import { FieldDetailsComponent } from './field/field-details/field-details.component';
import { FieldEditComponent} from './field/field-edit/field-edit.component';
import { DatafilesListComponent } from './dataset/datafile-list/datafiles-list.component';
import { DatafileDetailsComponent } from './dataset/datafile-list/datafile-details.component';
import { SchemasDatasetListComponent } from './schema/schemas-list/schemas-dataset-list.component';
import { OpenLicenseEditComponent } from './license/open-license/open-license-edit/open-license-edit.component';
import { ClosedLicenseEditComponent } from './license/closed-license/closed-license-edit/closed-license-edit.component';
import { ClosedLicenseDatasetListComponent } from './license/closed-license/closed-license-list/closed-license-list-dataset.component';
import { OpenLicenseDatasetListComponent } from './license/open-license/open-license-list/open-license-list-dataset.component';
import { DataFileEditComponent } from './dataset/datafile-edit/datafile-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentFormComponent } from './comment/comment-form/comment-form.component';
import { CommentDetailsComponent } from './comment/comment-details/comment-details.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { LicenseListComponent } from './license/license-list/license-list.component';
import { DatastreamsListComponent } from './dataset/datastream-list/datastreams-list.component';
import { DatastreamDetailsComponent } from './dataset/datastream-details/datastream-details.component';
import { DatastreamEditComponent } from './dataset/datastream-edit/datastream-edit.component';
import { CampusListComponent } from './campus/campus-list/campus-list.component';
import { CampusFormComponent } from './campus/campus-form/campus-form.component';
import {CampusDetailsComponent} from './campus/campus-details/campus-details.component';
import {CampusEditComponent} from './campus/campus-edit/campus-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'datasets', component: DatasetsListComponent },
  { path: 'datasets/new', component: DatasetFormComponent },
  { path: 'datasets/:id', component: DatasetDetailsComponent },
  { path: 'datasets/:id/edit', component: DatasetEditComponent, canActivate: [LoggedInGuard] },
  { path: 'dataFiles', component: DatafilesListComponent },
  { path: 'dataFiles/:id', component: DatafileDetailsComponent },
  { path: 'dataFiles/:id/edit', component: DataFileEditComponent },
  { path: 'schemas', component: SchemasListComponent },
  { path: 'schemas/new', component: SchemaFormComponent },
  { path: 'schemas/:id', component: SchemaDetailsComponent },
  { path: 'schemas/:id/edit', component: SchemaEditComponent, canActivate: [LoggedInGuard] },
  { path: 'schemas/:id/datasets', component: SchemasDatasetListComponent },
  { path: 'fields', component: FieldListComponent },
  { path: 'fields/new', component: FieldFormComponent },
  { path: 'fields/:id', component: FieldDetailsComponent },
  { path: 'fields/:id/edit', component: FieldEditComponent, canActivate: [LoggedInGuard] },
  { path: 'openLicenses', component: OpenLicenseListComponent },
  { path: 'openLicenses/new', component: OpenLicenseFormComponent },
  { path: 'openLicenses/:id', component: OpenLicenseDetailsComponent },
  { path: 'openLicenses/:id/edit', component: OpenLicenseEditComponent, canActivate: [LoggedInGuard] },
  { path: 'openLicenses/:id/datasets', component: OpenLicenseDatasetListComponent },
  { path: 'closedLicenses', component: ClosedLicenseListComponent },
  { path: 'closedLicenses/new', component: ClosedLicenseFormComponent },
  { path: 'closedLicenses/:id', component: ClosedLicenseDetailsComponent },
  { path: 'closedLicenses/:id/edit', component: ClosedLicenseEditComponent, canActivate: [LoggedInGuard] },
  { path: 'closedLicenses/:id/datasets', component: ClosedLicenseDatasetListComponent },
  { path: 'licenses', component: LicenseListComponent },
  { path: 'tags', component: TagsListComponent },
  { path: 'tags/new', component: TagFormComponent },
  { path: 'tags/:id', component: TagDetailsComponent },
  { path: 'dataStreams', component: DatastreamsListComponent },
  { path: 'dataStreams/:id', component: DatastreamDetailsComponent },
  { path: 'dataStreams/:id/edit', component: DatastreamEditComponent },
  { path: 'dataStreams', component: DatastreamsListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'comments/new', component: CommentFormComponent },
  { path: 'comments/:id', component: CommentDetailsComponent },
  { path: 'comments/:id/edit', component: CommentEditComponent, canActivate: [LoggedInGuard] },
  { path: 'campuses', component: CampusListComponent },
  { path: 'campuses/new', component: CampusFormComponent },
  { path: 'campuses/:id', component: CampusDetailsComponent },
  { path: 'campuses/:id/edit', component: CampusEditComponent },
];
