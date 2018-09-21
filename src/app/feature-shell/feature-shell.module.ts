import { FormsModule } from '@angular/forms';

import { UserdetailComponent } from './systemdashboard/userdetail/userdetail.component';
import { SystemdashboardComponent } from './systemdashboard/systemdashboard.component';
import { NgModule } from '@angular/core';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { FeatureShellComponent } from './feature-shell.component';
import { AuthService } from '../auth-shell/auth-shell.service';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { SystemdashboardService } from './systemdashboard/systemdashboard.service';
import { OrganizationdetailComponent } from './systemdashboard/organizationdetail/organizationdetail.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CaseChartComponent } from './case/case-chart/case-chart.component';
import { MatTabsModule} from '../../../node_modules/@angular/material';
import { ForinstCaseChartComponent } from './case/forinst-case-chart/forinst-case-chart.component';
import { AgainstinstCaseChartComponent } from './case/againstinst-case-chart/againstinst-case-chart.component';
import { UsersChartComponent } from './user/users-chart/users-chart.component';
import { TrialusersChartComponent } from './user/trialusers-chart/trialusers-chart.component';
import { TotaluserComponent } from './user/totaluser/totaluser.component';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  imports: [
    SelectDropDownModule,
    FeatureShellRoutingModule,
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    FormsModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [FeatureShellComponent,
    SystemdashboardComponent,
    UserdetailComponent,
    OrganizationdetailComponent,
    CaseChartComponent,
    ForinstCaseChartComponent,
    AgainstinstCaseChartComponent,
    UsersChartComponent,
    TrialusersChartComponent,
    TotaluserComponent,
  ],
  providers: [AuthService, SystemdashboardService],
  exports: [CaseChartComponent]
})
export class FeatureShellModule { }
