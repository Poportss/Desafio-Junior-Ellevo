import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscriber } from 'rxjs';
import { Status } from 'src/app/shared/enums/Status.enum';
import { AlertService } from 'src/app/shared/service/alert.service';
import { TaskService } from 'src/app/shared/service/task.service';
import { DialogDataTask } from 'src/app/shared/_interfaces/dialog-data-task';
import { UsersModalComponent } from 'src/app/views/users-modal/users-modal.component';

@Component({
  selector: 'app-tasks-modal',
  templateUrl: './tasks-modal.component.html',
  styleUrls: ['./tasks-modal.component.css'],
})
export class TasksModalComponent implements OnInit {
  private subscriptions = new Subscriber();
  @Output() modalClosed = new EventEmitter();
  private statusDefault = null;
  private status = Status;
  public enumKeys = [];
  public Editor = ClassicEditor;
  public generator;
  newTaskForm = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Responsible: new FormControl(''),
    Activity: new FormControl(''),
    Status: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<UsersModalComponent>,
    private taskservice: TaskService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; task: DialogDataTask }
  ) {
    this.enumKeys = Object.keys(this.status)
      .map((k, i) => {
        return Status[k];
      })
      .filter((f) => !isNaN(f));

    this.newTaskForm.controls['Status'].setValue(this.status['NotStarted'], {
      onlySelf: true,
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.dialogRef.afterClosed().subscribe(() => {
        this.modalClosed.emit();
      })
    );

    this.subscriptions.add(
      this.dialogRef.afterOpened().subscribe(() => {
        this.newTaskForm.patchValue(this.data.task);
      })
    );
  }

  onSubmit() {
    console.log(this.newTaskForm.value);

    if (this.data.id) {
      this.taskservice
        .updateTask(this.data.id, this.newTaskForm.value)
        .subscribe(() => {
          this.alertService.editUser();
          this.close();
        });
    } else
      this.taskservice.createTask(this.newTaskForm.value).subscribe(() => {
        this.alertService.createUser();
        this.close();
      });
  }

  onClear() {
    this.newTaskForm.reset();
  }
  close() {
    this.dialogRef.close();
  }
  changeDefault(value: Status) {
    this.statusDefault = this.status[value];
  }
}
