import { Observable } from 'rxjs';
import { StorageService } from './../../shared/services/storage.service';
import { ApiGateway } from './../../shared/services/api-gateway';
import { Injectable } from '@angular/core';

@Injectable()
export class CaseService {

  constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

  }

  getAllCasesByMonth(year): Observable<any>{
    return this.apiGateWay.get('/dash/cases/?year='+year);
  }

}
