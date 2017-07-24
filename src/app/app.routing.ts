import { Routes } from '@angular/router';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CampusListComponent } from './campus/campus-list/campus-list.component';
import { CampusFormComponent } from './campus/campus-form/campus-form.component';
import { CampusDetailsComponent } from './campus/campus-details/campus-details.component';
import { CampusEditComponent } from './campus/campus-edit/campus-edit.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { BuildingFormComponent } from './building/building-form/building-form.component';
import { BuildingDetailsComponent } from './building/building-details/building-details.component';
import { BuildingEditComponent } from './building/building-edit/building-edit.component';
import {FloorListComponent} from './floor/floor-list/floor-list.component';
import {FloorFormComponent} from './floor/floor-form/floor-form.component';
import {FloorDetailsComponent} from './floor/floor-details/floor-details.component';
import {FloorEditComponent} from './floor/floor-edit/floor-edit.component';
import {DealerListComponent} from './dealer/dealer-list/dealer-list.component';
import {DealerFormComponent} from './dealer/dealer-form/dealer-form.component';
import {DealerDetailsComponent} from './dealer/dealer-details/dealer-details.component';
import {DealerEditComponent} from './dealer/dealer-edit/dealer-edit.component';
import {EquipmentListComponent} from './equipment/equipment-list/equipment-list.component';
import {EquipmentFormComponent} from './equipment/equipment-form/equipment-form.component';
import {EquipmentDetailsComponent} from './equipment/equipment-details/equipment-details.component';
import {EquipmentEditComponent} from './equipment/equipment-edit/equipment-edit.component';
import {CardListComponent} from './card/card-list/card-list.component';
import {CardFormComponent} from './card/card-form/card-form.component';
import {CardDetailsComponent} from './card/card-details/card-details.component';
import {CardEditComponent} from './card/card-edit/card-edit.component';
import {ConnectorListComponent} from './connector/connector-list/connector-list.component';
import {ConnectorFormComponent} from './connector/connector-form/connector-form.component';
import {ConnectorDetailsComponent} from './connector/connector-details/connector-details.component';
import {ConnectorEditComponent} from './connector/connector-edit/connector-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'campuses', pathMatch: 'full' },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'campuses', component: CampusListComponent },
  { path: 'campuses/new', component: CampusFormComponent },
  { path: 'campuses/:id', component: CampusDetailsComponent },
  { path: 'campuses/:id/edit', component: CampusEditComponent },
  { path: 'buildings', component: BuildingListComponent },
  { path: 'buildings/new', component: BuildingFormComponent },
  { path: 'buildings/:id', component: BuildingDetailsComponent },
  { path: 'buildings/:id/edit', component: BuildingEditComponent },
  { path: 'floors', component: FloorListComponent },
  { path: 'floors/new', component: FloorFormComponent },
  { path: 'floors/:id', component: FloorDetailsComponent },
  { path: 'floors/:id/edit', component: FloorEditComponent },
  { path: 'dealers', component: DealerListComponent },
  { path: 'dealers/new', component: DealerFormComponent },
  { path: 'dealers/:id', component: DealerDetailsComponent },
  { path: 'dealers/:id/edit', component: DealerEditComponent },
  { path: 'equipments', component: EquipmentListComponent },
  { path: 'equipments/new', component: EquipmentFormComponent },
  { path: 'equipments/:id', component: EquipmentDetailsComponent },
  { path: 'equipments/:id/edit', component: EquipmentEditComponent },

  { path: 'cards', component: CardListComponent },
  { path: 'cards/new', component: CardFormComponent },
  { path: 'cards/:id', component: CardDetailsComponent },
  { path: 'cards/:id/edit', component: CardEditComponent },

  { path: 'connectors', component: ConnectorListComponent },
  { path: 'connectors/new', component: ConnectorFormComponent },
  { path: 'connectors/:id', component: ConnectorDetailsComponent },
  { path: 'connectors/:id/edit', component: ConnectorEditComponent },
];
