import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { CustomersComponent } from 'src/app/views/customers/customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { CallListComponent } from './call-list/call-list.component';
import { BodyComponent } from './body/body.component';
import { UsersComponent } from 'src/app/views/users/users.component';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    CustomersComponent,
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    CallListComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    CustomersComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    SidenavComponent,
    DashboardComponent,
    SettingsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewsModule {}
