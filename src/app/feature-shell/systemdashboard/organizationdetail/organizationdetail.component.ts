import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SystemdashboardService } from '../systemdashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Organization } from '../../../shared/models/user/organization';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-organizationdetail',
  templateUrl: './organizationdetail.component.html',
  styleUrls: ['./organizationdetail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrganizationdetailComponent implements OnInit {

  service: any;
  data= [];
  displayedColumns = ['organization', 'count'];
  dataSource;
  name;
  countname;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    
  }
  
  constructor(private _activatedRoute: ActivatedRoute, private _systemdashService: SystemdashboardService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
       this.service= params.mode;
      });
    
      if(this.service =='user'){
        this._systemdashService.getData('/users/org/totalusers/').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });    
        this.name = 'Total Users';
        this.countname= 'Users Count';
      }
      else if(this.service =='case'){
        this._systemdashService.getData('/case/org/').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });    
        this.name = 'Total Cases';
        this.countname= 'Case Count';
      }
      else if(this.service =='for'){
        this._systemdashService.getData('/case/org/for').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });    
        this.name = 'Total For Cases';
        this.countname= 'For Case Count';
      }
      else if(this.service =='against'){
        this._systemdashService.getData('/case/org/against').subscribe( result => {
          this.data = result;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });    
        this.name = 'Total Against Cases';
        this.countname= 'Against Case Count';
      }
      else if(this.service =='org'){
        this._systemdashService.getData('/dash/organizations').subscribe( result => {
          // this.data = result;
          // this.dataSource = new MatTableDataSource(this.data);
          // this.dataSource.paginator = this.paginator;

          result.forEach(element => this.data.push(element, { detailRow: true, element }));
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });    
        this.name = 'Organizations';
      }

    
  }
}

