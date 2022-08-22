import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusPipe } from 'src/app/shared/pipes/status.pipe';
import { TaskService } from 'src/app/shared/service/task.service';
import { Task } from 'src/app/shared/models/Task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from 'src/app/shared/enums/Status.enum';
import { CallListService } from 'src/app/shared/service/call-list.service';
import { AlertService } from 'src/app/shared/service/alert.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivityModel } from 'src/app/shared/models/activity.model';

@Component({
  selector: 'app-call-list-detail',
  templateUrl: './call-list-detail.component.html',
  styleUrls: ['./call-list-detail.component.css'],
})
export class CallListDetailComponent implements OnInit {
  public panelOpenState = false;
  public taskId;
  public taskList;
  public taskActivity;
  p: number = 1;
  public Editor = ClassicEditor;
  private statusDefault = null;
  private status = Status;
  public enumKeys = [];

  detailForm = new FormGroup({
    Activity: new FormControl(''),
    TaskId: new FormControl(''),
  });

  UpadateForm = new FormGroup({
    Title: new FormControl(''),
    Description: new FormControl(''),
    Responsible: new FormControl(''),
    Status: new FormControl(''),
  });

  constructor(
    private taskService: TaskService,
    private callListService: CallListService,
    private route: ActivatedRoute,
    private statusPipe: StatusPipe,
    private alertService: AlertService
  ) {
    this.route.params.subscribe((params) => (this.taskId = params['id']));
    this.enumKeys = Object.keys(this.status)
      .map((k, i) => {
        return Status[k];
      })
      .filter((f) => !isNaN(f));
  }

  ngOnInit() {
    this.getUserTask();
    this.getTaskId();
    console.log(this.taskActivity);
  }

  getUserTask() {
    this.taskService.getTaskById(this.taskId).subscribe((data: Array<Task>) => {
      this.taskList = data;
      console.log(this.taskList);
      this.detailForm.patchValue(this.taskList);
      this.UpadateForm.patchValue(this.taskList);
      this.detailForm.controls.TaskId.setValue(this.taskId);
    });
  }
  getTaskId() {
    this.callListService
      .getActivity()
      .subscribe((data: Array<ActivityModel>) => {
        this.taskActivity = data;
        console.log(this.taskActivity);
      });
  }
  onSubmit() {
    this.callListService.createActivity(this.detailForm.value).subscribe(() => {
      this.alertService.createUser();
    });
  }
  changeDefault(value: Status) {
    this.statusDefault = this.status[value];
  }
  save() {
    console.log(this.taskId);
    // this.UpadateForm.controls["Title"].setValue()
    console.log(this.taskList);

    this.taskService
      .updateTask(this.taskId, this.UpadateForm.value)
      .subscribe(() => {
        this.alertService.editUser();
      });
  }
}
