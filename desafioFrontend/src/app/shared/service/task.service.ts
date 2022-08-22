import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retryWhen, delay, take, catchError } from 'rxjs';
import { Task } from 'src/app/shared/models/Task.model';
import { HttpUtilService } from 'src/app/shared/service/http-util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = environment.URL;
  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}
  getTasks() {
    return this.http.get('https://localhost:5001/api/task');
  }

  createTask(task: Task) {
    return this.http
      .post('https://localhost:5001/api/task', task)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }
  updateTask(id: number, body: Task) {
    return this.http
      .put('https://localhost:5001/api/task/' + id, body)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }
  deleteTask(id: string) {
    return this.http
      .delete('https://localhost:5001/api/task/' + id)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(3))),
        catchError(this.httpUtil.processError)
      );
  }

  getTaskById(id: string) {
    return this.http
      .get('https://localhost:5001/api/task/' + id)
      .pipe(map(this.httpUtil.extractData))
      .pipe(
        retryWhen((errors) => errors.pipe(delay(1000), take(10))),
        catchError(this.httpUtil.processError)
      );
  }
}
