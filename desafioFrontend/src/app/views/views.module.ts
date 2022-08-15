import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { CallListComponent } from './call-list/call-list.component';
import { BodyComponent } from './body/body.component';
import { UsersComponent } from 'src/app/views/users/users.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UsersModalComponent } from 'src/app/views/users-modal/users-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    CallListComponent,
    BodyComponent,
    UsersModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    UsersComponent,
    SidenavComponent,
    DashboardComponent,
    SettingsComponent,
    UsersModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewsModule {}
