import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/User.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  newUserForm = new FormGroup({
    name: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
    cpf: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private http: HttpClient
  ) {}
  public closeModal: string = '';
  public btnLabel: string = '';
  public formLabel: string = '';
  public userList: User[] = new Array<User>();
  public users: User = new User();

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
  }

  getUserList() {
    this.userService.getUser().subscribe((data: Array<User>) => {
      this.userList = data;
    });
  }

  addUser(content: any) {
    this.formLabel = 'New User';
    this.btnLabel = 'Save';

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  getUsersById(id: string) {
    this.userService.getUserById(id).subscribe((data: User) => {
      this.users = data;
    });
  }

  editUser(content: any, item) {
    this.formLabel = 'Edit User';
    this.btnLabel = 'Upadate';

    this.getUsersById(item.UserId);

    this.newUserForm.patchValue({
      name: item.Name,
      user: item.User,
      password: item.Password,
      cpf: item.Cpf,
      phone: item.Phone,
      email: item.Email,
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  deleteUser(item) {
    this.alertService
      .question('', 'Do you really want to delete this user?', 'Yes!')
      .then((data) => {
        if (data.isConfirmed) {
          this.userService.deleteUser(item.UserId).subscribe((data) => {
            this.getUserList();
            this.alertService.success('', 'user deleted successfully!', 'OK');
          });
        }
      });
  }

  sendForm(item) {
    const form = {
      Name: this.newUserForm.value.name,
      User: this.newUserForm.value.user,
      Password: this.newUserForm.value.password,
      Cpf: this.newUserForm.value.cpf,
      Phone: this.newUserForm.value.phone,
      Email: this.newUserForm.value.email,
    };
    console.log(form);
    console.log(this.users.UserId);
    console.log(form.User);

    if (this.users.UserId != undefined) {
      let Id: number = this.users.UserId;
      let UserId: string = Id + '';
      this.userService.updateUser(UserId, form).subscribe((data) => {
        this.modalService.dismissAll();
        this.getUserList();
        this.users = new User();

        this.alertService.success('', 'user updated successfully!', 'Ok');
      });
    } else {
      this.userService.createUser(form).subscribe((data) => {
        this.modalService.dismissAll();
        this.getUserList();
        this.users = new User();
        this.alertService.success('', 'successfully created user!', 'Ok');
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
