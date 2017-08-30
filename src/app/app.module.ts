import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { OwnerService } from './user/owner.service';
import { UserService } from './user/user.service';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CampusListComponent } from './campus/campus-list/campus-list.component';
import { CampusService } from './campus/campus.service';
import { CampusFormComponent } from './campus/campus-form/campus-form.component';
import { CampusDetailsComponent } from './campus/campus-details/campus-details.component';
import { CampusEditComponent } from './campus/campus-edit/campus-edit.component';
import { CampusSearchComponent } from './campus/campus-search/campus-search.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { BuildingService } from './building/building.service';
import { BuildingFormComponent } from './building/building-form/building-form.component';
import { BuildingDetailsComponent } from './building/building-details/building-details.component';
import { BuildingEditComponent } from './building/building-edit/building-edit.component';
import { BuildingSearchComponent} from './building/building-search/building-search.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { FloorFormComponent } from './floor/floor-form/floor-form.component';
import { FloorEditComponent } from 'app/floor/floor-edit/floor-edit.component';
import { FloorDetailsComponent } from './floor/floor-details/floor-details.component';
import { FloorSearchComponent } from 'app/floor/floor-search/floor-search.component';
import { FloorService } from './floor/floor.service';
import { EquipmentRoomListComponent } from './equipmentRoom/equipmentRoom-list/equipmentRoom-list.component';
import { EquipmentRoomFormComponent } from './equipmentRoom/equipmentRoom-form/equipmentRoom-form.component';
import { EquipmentRoomDetailsComponent } from './equipmentRoom/equipmentRoom-details/equipmentRoom-details.component';
import { EquipmentRoomEditComponent } from './equipmentRoom/equipmentRoom-edit/equipmentRoom-edit.component';
import { EquipmentRoomSearchComponent } from './equipmentRoom/equipmentRoom-search/equipmentRoom-search.component';
import { EquipmentRoomService } from './equipmentRoom/equipmentRoom.service';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipment/equipment-form/equipment-form.component';
import { EquipmentDetailsComponent } from './equipment/equipment-details/equipment-details.component';
import { EquipmentEditComponent } from './equipment/equipment-edit/equipment-edit.component';
import { EquipmentSearchComponent } from './equipment/equipment-search/equipment-search.component';
import { EquipmentService } from './equipment/equipment.service';
import { CardListComponent } from './card/card-list/card-list.component';
import { CardFormComponent } from './card/card-form/card-form.component';
import { CardDetailsComponent } from './card/card-details/card-details.component';
import { CardEditComponent } from './card/card-edit/card-edit.component';
import { CardSearchComponent } from './card/card-search/card-search.component';
import { CardService } from './card/card.service';
import { UpdateCardService } from './card/update.card.service';
import { UpdateBuildingService } from './building/update.building.service';
import { UpdateFloorService } from './floor/update.floor.service';
import { UpdateEquipmentRoomService } from './equipmentRoom/update.equipmentRoom.service';
import { UpdateEquipmentService } from './equipment/update.equipment.service';
import { ConnectorListComponent } from './connector/connector-list/connector-list.component';
import { ConnectorFormComponent } from './connector/connector-form/connector-form.component';
import { ConnectorDetailsComponent } from './connector/connector-details/connector-details.component';
import { ConnectorEditComponent } from './connector/connector-edit/connector-edit.component';
import { ConnectorSearchComponent } from './connector/connector-search/connector-search.component';
import { ConnectorService } from './connector/connector.service';
import { UpdateConnectorService } from './connector/update.connector.service';
import { PortService } from './port/port.service';
import { UpdateCampusService } from './campus/update.campus.service';
import { ImgMapComponent } from 'ng2-img-map';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CustomModalComponent } from './connector/connector-list/custom-modal-sample';
import { ConnectorConfigService } from './connector/connector-list/connector-config.service';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomOption } from './custom-option';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserDetailComponent,
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
    EquipmentRoomListComponent,
    EquipmentRoomFormComponent,
    EquipmentRoomDetailsComponent,
    EquipmentRoomEditComponent,
    EquipmentRoomSearchComponent,
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
    ConnectorListComponent,
    ConnectorFormComponent,
    ConnectorDetailsComponent,
    ConnectorEditComponent,
    ConnectorSearchComponent,

    ImgMapComponent,
    CustomModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    LoginBasicModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthenticationBasicService, LoggedInGuard, OwnerService, UserService, OwnerService, CampusService,
    BuildingService, FloorService, EquipmentRoomService, EquipmentService, CardService, ConnectorService, UpdateCardService,
    UpdateBuildingService, UpdateFloorService, UpdateEquipmentRoomService, UpdateEquipmentService, UpdateConnectorService,
    PortService, UpdateCampusService, ConnectorConfigService, {provide: ToastOptions, useClass: CustomOption}, ],
  bootstrap: [AppComponent],
  entryComponents: [ CustomModalComponent ],
})
export class AppModule { }
