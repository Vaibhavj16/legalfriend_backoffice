import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-totaluser',
  templateUrl: './totaluser.component.html',
  styleUrls: ['./totaluser.component.css'],
  providers: [UserService]
})
export class TotaluserComponent implements OnInit {

  employee=0;
  client=0;
  manager=0;
  admin=0;  

  constructor(private _userService: UserService) { }
  
  ngOnInit() {

      this._userService.getUserCountByRole().subscribe(
        result => {
          this.employee =result.EMPLOYEE;
          this.client =result.CLIENT;
          this.manager =result.MANAGER;
          this.admin =result.Admin;
        }
      );
  }

}
