import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusPipe } from 'src/app/shared/pipes/status.pipe';
import { TaskService } from 'src/app/shared/service/task.service';
import { Task } from 'src/app/shared/models/Task.model';
import {
  UntypedFormGroup,
  UntypedFormControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  public detailedTask;
  public ListTasks;
  public taskActivity;
  p: number = 1;
  public Editor = ClassicEditor;
  private statusDefault = null;
  private status = Status;
  public enumKeys = [];

  detailForm = new UntypedFormGroup({
    Activity: new UntypedFormControl(''),
    TaskId: new UntypedFormControl(''),
    Generator: new UntypedFormControl(''),
  });

  UpadateForm = new UntypedFormGroup({
    Title: new UntypedFormControl('', Validators.required),
    Description: new UntypedFormControl('', Validators.required),
    Responsible: new UntypedFormControl(''),
    Status: new UntypedFormControl(''),
    GeneratorName: new UntypedFormControl(''),
    ResponsibleName: new UntypedFormControl(''),
  });
  errors: any;

  constructor(
    private taskService: TaskService,
    private callListService: CallListService,
    private route: ActivatedRoute,
    private statusPipe: StatusPipe,
    private alertService: AlertService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.taskId = params['id']));
    this.enumKeys = Object.keys(this.status)
      .map((k, i) => {
        return Status[k];
      })
      .filter((f) => !isNaN(f));
  }

  ngOnInit() {
    this.getdetailedTask();
    this.getAcitivity();
    console.log(this.getdetailedTask());
  }

  getdetailedTask() {
    this.taskService.getTaskById(this.taskId).subscribe((data: Task) => {
      this.detailedTask = data;
      console.log(this.detailedTask);
      this.detailForm.patchValue(this.detailedTask);
      this.detailForm.controls.TaskId.setValue(this.taskId);
      this.detailForm.controls.Generator.setValue(this.taskId);

      this.UpadateForm.patchValue(this.detailedTask);
      this.UpadateForm.controls.GeneratorName.disable();
      this.UpadateForm.controls.ResponsibleName.disable();
    });
  }
  validFormActivity(input: FormControl) {
    return input.value.GeneratorName;
  }
  getAcitivity() {
    this.callListService
      .getActivity()
      .subscribe((data: Array<ActivityModel>) => {
        this.taskActivity = data;
      });
  }
  onSubmit() {
    this.callListService.createActivity(this.detailForm.value).subscribe({
      next: (result) => {
        this.alertService.newActivity();
        this.detailForm.reset();
        this.getAcitivity();
      },
      error: (err) => {
        this.alertService.ErroActivety();
        console.log(err);
      },
    });
  }
  changeDefault(value: Status) {
    this.statusDefault = this.status[value];
  }
  save() {
    this.taskService
      .updateTask(this.taskId, this.UpadateForm.value)
      .subscribe(() => {
        this.alertService.saveTask();
        this.getdetailedTask();
      });
  }
  back() {
    this.router.navigate(['/callList']);
  }
  onSearch() {
    console.log(this.detailForm.value);
  }
}
