import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layout/components/admin/admin.component';

import { BasicformComponent } from './examples/basicform/basicform.component';
import { AdvancedformComponent } from './examples/advancedform/advancedform.component';
import { FormexamplesComponent } from './examples/formexamples/formexamples.component';
import { FormvalidationComponent } from './examples/formvalidation/formvalidation.component';
import { SummernoteComponent } from './examples/summernote/summernote.component';
import { CallapiComponent } from "./examples/callapi/callapi.component";
import { GridviewComponent } from './examples/gridview/gridview.component';
import { IndexComponent } from './index/index.component';
import { DueDiligenceComponent } from './investigation/duediligence/due-diligence/due-diligence.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },

      // Home
      { path: 'index', component: IndexComponent },

      // Examples
      { path: 'basicform', component: BasicformComponent },
      { path: 'advancedform', component: AdvancedformComponent },
      { path: 'formexamples', component: FormexamplesComponent },
      { path: 'formvalidation', component: FormvalidationComponent },
      { path: 'formsummernote', component: SummernoteComponent },
      { path: 'callapi', component: CallapiComponent },
      { path: 'gridview', component: GridviewComponent },
      { path: 'duediligence', component: DueDiligenceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

