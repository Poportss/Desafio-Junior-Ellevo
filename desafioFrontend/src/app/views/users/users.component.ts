import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber } from 'rxjs';

import { User } from 'src/app/shared/models/User.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { UserService } from 'src/app/shared/service/user.service';
import { DialogData } from 'src/app/shared/_interfaces/DialogData';
import { UsersModalComponent } from 'src/app/views/users-modal/users-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}
  public closeModal: string = '';
  public btnLabel: string = '';
  public Title: string = '';
  public Name: string = '';
  public userList: User[] = new Array<User>();
  public users: User = new User();
  public data: DialogData[] = [];
  private subscriptions = new Subscriber();
  Header = [
    { Head: 'ID', Body: 'UserId' },
    { Head: 'Name', Body: 'Name' },
    { Head: 'User', Body: 'User' },
    { Head: 'Phone', Body: 'Phone' },
    { Head: 'Email', Body: 'Email' },
    {
      Head: 'Action',
      Body: '',
      icon: 'fal fa-pencil',
      secondIcon: ' fal fa-trash',
    },
  ];

  ngOnInit() {
    this.getUserList();
    this.subscriptions.add(
      this.dialog.afterAllClosed.subscribe(() => {
        this.getUserList();
      })
    );
  }

  getUserList() {
    this.userService.getUser().subscribe((data: Array<User>) => {
      this.userList = data;
    });
  }

  openDialog() {
    this.dialog.open(UsersModalComponent, this.getModalConfigs());
  }

  editUser(item) {
    debugger;

    this.dialog.open(UsersModalComponent, this.getModalConfigs(item));
  }

  deleteUser(item) {
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
        this.userService.deleteUser(item.UserId).subscribe((data) => {
          this.getUserList();
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  addUser() {
    this.openDialog();
  }

  private getModalConfigs(data: any = undefined) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { id: data?.Id, user: data };

    return dialogConfig;
  }
}
