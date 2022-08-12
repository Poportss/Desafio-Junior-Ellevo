import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor() {}

  extractData(response: any) {
    const data = response;
    return data || {};
  }

  processError(erro: any) {
    return throwError(() => new Error(erro));
  }
}
