import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { A11yModule } from '@angular/cdk/a11y'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { PortalModule } from '@angular/cdk/portal'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CdkStepperModule } from '@angular/cdk/stepper'
import { CdkTableModule } from '@angular/cdk/table'
import { CdkTreeModule } from '@angular/cdk/tree'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzStepsModule } from 'ng-zorro-antd/steps'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzTreeModule } from 'ng-zorro-antd/tree'
import { NzTransferModule } from 'ng-zorro-antd/transfer'
import { NzMessageService } from 'ng-zorro-antd/message'

import { PagesRoutingModule } from './pages-routing.module'
import { AdminComponent } from './layout/components/admin/admin.component'
import { OverlayMenuComponent } from './layout/components/overlay-menu/overlay-menu.component'
import { RightSidebarComponent } from './layout/components/right-sidebar/right-sidebar.component'

import { LeftSidebarComponent } from './layout/components/left-sidebar/left-sidebar.component'
import { SettingsComponent } from './layout/components/settings/settings.component'

import { NgSortableHeader } from './directive/sortable.directive'

import { BasicformComponent } from './examples/basicform/basicform.component'
import { AdvancedformComponent } from './examples/advancedform/advancedform.component'
import { FormexamplesComponent } from './examples/formexamples/formexamples.component'
import { FormvalidationComponent } from './examples/formvalidation/formvalidation.component'
import { SummernoteComponent } from './examples/summernote/summernote.component'
import { CallapiComponent } from './examples/callapi/callapi.component'
import { GridviewComponent } from './examples/gridview/gridview.component'

import { IndexComponent } from './index/index.component'
import { DueDiligenceComponent } from './investigation/duediligence/due-diligence/due-diligence.component'
import { TableListComponent } from './investigation/duediligence/table-list/table-list.component'
import { MaintainAreaComponent } from './investigation/duediligence/maintain-area/maintain-area.component'
import { RealTimeViewComponent } from './real-time/real-time-view.component'
import { ParameterSettingViewComponent } from './parameter-setting/parameter-setting.component'

const MatDragDropModules = [
  ClipboardModule,
  DragDropModule,
  PortalModule,
  ScrollingModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
]

@NgModule({
  declarations: [
    AdminComponent,
    OverlayMenuComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    SettingsComponent,
    BasicformComponent,
    AdvancedformComponent,
    FormexamplesComponent,
    FormvalidationComponent,
    SummernoteComponent,
    CallapiComponent,
    GridviewComponent,
    NgSortableHeader,
    IndexComponent,
    DueDiligenceComponent,
    RealTimeViewComponent,
    TableListComponent,
    MaintainAreaComponent,
    ParameterSettingViewComponent,
  ],

  imports: [
    NzIconModule,
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDragDropModules,
    NzDatePickerModule,
    NzPopoverModule,
    NzStepsModule,
    NzSelectModule,
    NzModalModule,
    NzTabsModule,
    NzRadioModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzInputModule,
    NzDropDownModule,
    NzToolTipModule,
    NzElementPatchModule,
    NzTableModule,
    NzPageHeaderModule,
    NzFormModule,
    NzTransferModule,
    NzCheckboxModule,
    NzBadgeModule,
    NzMenuModule,
    NzTreeViewModule,
    NzUploadModule,
    NzTreeModule,
  ],

  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
  ],

  providers: [DatePipe, { provide: NzMessageService }],
})
export class AdminModule {}
