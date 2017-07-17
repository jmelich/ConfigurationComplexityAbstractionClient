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
import {CampusService} from './campus/campus.service';
import {CampusFormComponent} from './campus/campus-form/campus-form.component';
import {CampusDetailsComponent} from './campus/campus-details/campus-details.component';
import {CampusEditComponent} from './campus/campus-edit/campus-edit.component';
import { CampusSearchComponent} from './campus/campus-search/campus-search.component';
import {BuildingListComponent} from './building/building-list/building-list.component';
import {BuildingService} from './building/building.service';
import {BuildingFormComponent} from './building/building-form/building-form.component';
import {BuildingDetailsComponent} from './building/building-details/building-details.component';
import {BuildingEditComponent} from './building/building-edit/building-edit.component';
import { BuildingSearchComponent} from './building/building-search/building-search.component';
import {FloorListComponent} from './floor/floor-list/floor-list.component';
import {FloorFormComponent} from './floor/floor-form/floor-form.component';
import {FloorEditComponent} from 'app/floor/floor-edit/floor-edit.component';
import {FloorDetailsComponent} from './floor/floor-details/floor-details.component';
import {FloorSearchComponent} from 'app/floor/floor-search/floor-search.component';
import {FloorService} from './floor/floor.service';
import {DealerListComponent} from './dealer/dealer-list/dealer-list.component';
import {DealerFormComponent} from './dealer/dealer-form/dealer-form.component';
import {DealerDetailsComponent} from './dealer/dealer-details/dealer-details.component';
import {DealerEditComponent} from './dealer/dealer-edit/dealer-edit.component';
import {DealerSearchComponent} from './dealer/dealer-search/dealer-search.component';
import {DealerService} from './dealer/dealer.service';
import {EquipmentListComponent} from './equipment/equipment-list/equipment-list.component';
import {EquipmentFormComponent} from './equipment/equipment-form/equipment-form.component';
import {EquipmentDetailsComponent} from './equipment/equipment-details/equipment-details.component';
import {EquipmentEditComponent} from './equipment/equipment-edit/equipment-edit.component';
import {EquipmentSearchComponent} from './equipment/equipment-search/equipment-search.component';
import {EquipmentService} from './equipment/equipment.service';
import {CardListComponent} from './card/card-list/card-list.component';
import {CardFormComponent} from './card/card-form/card-form.component';
import {CardDetailsComponent} from './card/card-details/card-details.component';
import {CardEditComponent} from './card/card-edit/card-edit.component';
import {CardSearchComponent} from './card/card-search/card-search.component';
import {CardService} from './card/card.service';
import {UpdateCardService} from './card/update.card.service';
import {UpdateBuildingService} from './building/update.building.service';
import {UpdateFloorService} from './floor/update.floor.service';
import {UpdateDealerService} from './dealer/update.dealer.service';
import {UpdateEquipmentService} from './equipment/update.equipment.service';

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
    CampusEditComponent,
    CampusSearchComponent,
    BuildingListComponent,
    BuildingFormComponent,
    BuildingDetailsComponent,
    BuildingEditComponent,
    BuildingSearchComponent,
    FloorListComponent,
    FloorFormComponent,
    FloorDetailsComponent,
    FloorEditComponent,
    FloorSearchComponent,
    DealerListComponent,
    DealerFormComponent,
    DealerDetailsComponent,
    DealerEditComponent,
    DealerSearchComponent,
    EquipmentListComponent,
    EquipmentFormComponent,
    EquipmentDetailsComponent,
    EquipmentEditComponent,
    EquipmentSearchComponent,
    CardListComponent,
    CardFormComponent,
    CardDetailsComponent,
    CardEditComponent,
    CardSearchComponent,
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
              FieldService, CommentService, OwnerService, DataStreamService, CampusService, BuildingService, FloorService, DealerService,
  EquipmentService, CardService, UpdateCardService, UpdateBuildingService, UpdateFloorService, UpdateDealerService, UpdateEquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
