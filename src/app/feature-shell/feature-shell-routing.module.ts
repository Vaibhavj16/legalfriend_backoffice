import { OrganizationdetailComponent } from './systemdashboard/organizationdetail/organizationdetail.component';
import { UserdetailComponent } from './systemdashboard/userdetail/userdetail.component';
import { SystemdashboardComponent } from './systemdashboard/systemdashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellComponent } from './feature-shell.component';

import { LFAuthantication } from '../shared/services/lfAuthantication-service';
import { NgxPermissionsGuard, NgxPermissionsService } from 'ngx-permissions';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const featureShellRoutes: Routes = [
    {
       
        path: '',
        component: FeatureShellComponent, canActivate: [LFAuthantication], children: [
            { path: 'profile', loadChildren: 'app/feature-shell/profile/profile.module#ProfileModule' },
            { path: 'dashboard', component: SystemdashboardComponent },
            { path: 'userdetails', component: UserdetailComponent },
            { path: 'orgdetails', component: OrganizationdetailComponent },
            { path: '', loadChildren: 'app/feature-shell/admin/admin.module#AdminModule' },
            { path: '', redirectTo: 'backoffice', pathMatch: 'full' },
        ],
        },
   
];

@NgModule({
    imports: [RouterModule.forChild(featureShellRoutes)],
    exports: [RouterModule]
})
export class FeatureShellRoutingModule {

    constructor(private permissionsService: NgxPermissionsService) {
        this.permissionsService.loadPermissions([localStorage.getItem('permission_level')]);
    }
}
