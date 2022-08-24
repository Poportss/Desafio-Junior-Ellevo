import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { ActivityModel } from 'src/app/shared/models/activity.model';
import { HttpUtilService } from 'src/app/shared/service/http-util.service';

@Injectable({
  providedIn: 'root',
})
export class CallListService {
  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}
  getActivity() {
    return this.http.get('https://localhost:5001/api/activity');
  }

  createActivity(activity: ActivityModel) {
    return this.http
      .post('https://localhost:5001/api/activity', activity)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        catchError(() => {
          return throwError(() => new Error('ups sommething happend'));
        })
      );
  }
}
