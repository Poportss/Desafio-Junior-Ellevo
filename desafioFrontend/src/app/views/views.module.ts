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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { UsersModalComponent } from 'src/app/views/users-modal/users-modal.component';
import { TasksModalComponent } from 'src/app/views/tasks-modal/tasks-modal.component';
import { CallListDetailComponent } from 'src/app/views/call-list-detail/call-list-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
    TasksModalComponent,
    CallListDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    CKEditorModule,
    NgxPaginationModule,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    UsersComponent,
    SidenavComponent,
    DashboardComponent,
    SettingsComponent,
    TasksModalComponent,
    CallListDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewsModule {}
