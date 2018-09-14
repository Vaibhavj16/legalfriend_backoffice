import { Observable } from 'rxjs';
import { StorageService } from './../../shared/services/storage.service';
import { ApiGateway } from './../../shared/services/api-gateway';
import { Injectable } from '@angular/core';

@Injectable()
export class CaseService {

  constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

  }

  getCasesByYear(year): Observable<any>{
    return this.apiGateWay.get('/dash/cases/?year='+year);
  }

  getCasesByDate(start,end): Observable<any>{
    return this.apiGateWay.get('/dash/cases/date?startDate='+start+'&endDate='+end);
  }

  getForCasesByYear(year): Observable<any>{
    return this.apiGateWay.get('/dash/forcases/?year='+year);
  }

  getAgainstCasesByYear(year): Observable<any>{
    return this.apiGateWay.get('/dash/againstcases/?year='+year);
  }

  getForCasesByDate(start,end): Observable<any>{
    return this.apiGateWay.get('/dash/forcases/date?startDate='+start+'&endDate='+end);
  }

  getAgainstCasesByDate(start,end): Observable<any>{
    return this.apiGateWay.get('/dash/againstcases/date?startDate='+start+'&endDate='+end);
  }
}
