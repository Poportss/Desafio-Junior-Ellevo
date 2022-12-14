import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscriber } from 'rxjs';
import { AlertService } from 'src/app/shared/service/alert.service';
import { UserService } from 'src/app/shared/service/user.service';
import { DialogData } from 'src/app/shared/_interfaces/DialogData';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css'],
})
export class UsersModalComponent implements OnInit {
  private subscriptions = new Subscriber();
  @Output() modalClosed = new EventEmitter();

  newUserForm = new UntypedFormGroup({
    Name: new UntypedFormControl('', [Validators.required]),
    User: new UntypedFormControl('', [Validators.required]),
    Password: new UntypedFormControl('', [Validators.required]),
    Cpf: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    Phone: new UntypedFormControl('', [Validators.minLength(15)]),
    Email: new UntypedFormControl('', [Validators.email]),
  });

  constructor(
    private dialogRef: MatDialogRef<UsersModalComponent>,
    private userservice: UserService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; user: DialogData }
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.dialogRef.afterClosed().subscribe(() => {
        this.modalClosed.emit();
      })
    );

    this.subscriptions.add(
      this.dialogRef.afterOpened().subscribe(() => {
        this.newUserForm.patchValue(this.data.user);
      })
    );
  }

  onSubmit() {
    if (this.data.id) {
      this.userservice
        .updateUser(this.data.id, this.newUserForm.value)
        .subscribe(() => {
          this.alertService.editUser();
          this.close();
        });
    } else
      this.userservice.createUser(this.newUserForm.value).subscribe(() => {
        this.alertService.createUser();
        this.close();
      });
  }
  onClear() {
    this.newUserForm.reset();
  }
  close() {
    this.dialogRef.close();
  }
}
