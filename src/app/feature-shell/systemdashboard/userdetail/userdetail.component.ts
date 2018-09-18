import { UserService } from './../../user/user.service';
import { SystemdashboardService } from '../systemdashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../shared/models/user/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource, MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserdetailComponent implements OnInit {

  title : any
   service: any;
   data=[];
   displayedColumns = ['name','email','organization'];
   dataSource=new MatTableDataSource;
   name;
   isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
   expandedElement: any;

  constructor(private _systemdashService: SystemdashboardService, private _activatedRoute: ActivatedRoute
  ,private _userService: UserService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this._activatedRoute.params.subscribe((params: Params) => {
       this.service= params.mode;
      });
      const client = '?userId=' + localStorage.getItem('client_id');
    
      if(this.service == 'trial') {
            this._systemdashService.getUsers('/trialusers').subscribe(result => {
            this.title = 'Trial Users';
            result.forEach(element => this.data.push(element, { detailRow: true, element }));
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            
          });
      }
      else if(this.service == 'inactiveusers'){
           this._systemdashService.getUsers('/inactiveusers').subscribe(result => {
            this.title = 'Users Inactive Since Last Month';
            result.forEach(element => this.data.push(element, { detailRow: true, element }));
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
          });
      }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

