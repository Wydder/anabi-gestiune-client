import { NgModule } from '@angular/core';

// modules
import { SharedModule } from '../shared/shared.module';
import { AssetsRoutingModule } from './assets-routing.module';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

// components
import { AssetsComponent } from './assets.component';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { AddDefendantComponent } from './components/add-defendant/add-defendant.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { EditSolutionComponent } from './components/edit-solution/edit-solution.component';

@NgModule({
  imports: [
    SharedModule,
    AssetsRoutingModule,
  ],
  declarations: [
    AssetsComponent,
    AddAssetComponent,
    AssetDetailComponent,
    EditSolutionComponent,
    AddDefendantComponent,
  ],
  entryComponents: [
    AddAssetComponent,
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
  ],
})
export class AssetsModule { }
