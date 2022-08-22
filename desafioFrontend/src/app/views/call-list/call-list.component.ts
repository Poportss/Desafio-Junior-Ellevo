import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { end } from '@popperjs/core';
import { Subscriber } from 'rxjs';
import { Task } from 'src/app/shared/models/Task.model';
import { StatusPipe } from 'src/app/shared/pipes/status.pipe';
import { TaskService } from 'src/app/shared/service/task.service';
import { DialogData } from 'src/app/shared/_interfaces/DialogData';
import { TasksModalComponent } from 'src/app/views/tasks-modal/tasks-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css'],
})
export class CallListComponent implements OnInit {
  constructor(
    private taskervice: TaskService,
    public dialog: MatDialog,
    private statusPipe: StatusPipe,
    private router: Router
  ) {}
  public taskList: Task[] = new Array<Task>();
  public tasks: Task = new Task();
  public data: DialogData[] = [];
  private subscriptions = new Subscriber();

  Header = [
    { Head: 'Title', Body: 'Title' },
    { Head: 'Description', Body: 'Description' },

    { Head: 'Responsible', Body: 'Responsible' },
    { Head: 'Status', Body: 'Status' },
    {
      Head: 'Action',
      Body: '',
      icon: 'fal fa-pencil',
      secondIcon: ' fal fa-trash',
    },
  ];
  ngOnInit() {
    this.getTaskList();
    console.log(this.taskList);
    this.subscriptions.add(
      this.dialog.afterAllClosed.subscribe(() => {
        this.getTaskList();
      })
    );
  }
  getTaskList() {
    this.taskervice.getTasks().subscribe((data: Array<Task>) => {
      this.taskList = data.map((item) => {
        return {
          ...item,
          Status: this.statusPipe.transform(item.Status),
        };
      });
    });
  }

  openDialog() {
    this.dialog.open(TasksModalComponent, this.getModalConfigs());
  }
  editTask(item) {
    console.log(item.Id);
    this.router.navigate(['/detail', item.Id]);
  }
  deleteTask(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#233238',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskervice.deleteTask(item.Id).subscribe((data) => {
          this.getTaskList();
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  addTask() {
    this.openDialog();
  }
  private getModalConfigs(data: any = undefined) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '64%';
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = { id: data?.Id, user: data };

    return dialogConfig;
  }
}
