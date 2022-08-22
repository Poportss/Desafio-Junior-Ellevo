import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, retryWhen, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User.model';
import { HttpUtilService } from 'src/app/shared/service/http-util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.URL + 'api/';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getUser() {
    return this.http
      .get('https://localhost:5001/api/user')
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }

  createUser(user: User) {
    return this.http
      .post('https://localhost:5001/api/user', user)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }

  updateUser(id: number, body: User) {
    return this.http
      .put('https://localhost:5001/api/user/' + id, body)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }

  deleteUser(id: string) {
    return this.http
      .delete('https://localhost:5001/api/user/' + id)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(3))),
        catchError(this.httpUtil.processError)
      );
  }

  getUserById(id: string) {
    return this.http
      .get('https://localhost:5001/api/user/' + id)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }
}
