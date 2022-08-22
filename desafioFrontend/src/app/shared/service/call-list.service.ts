import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retryWhen, delay, take, catchError } from 'rxjs';
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
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }
}
