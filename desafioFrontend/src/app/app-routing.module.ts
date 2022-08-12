import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CallListComponent } from 'src/app/views/call-list/call-list.component';
import { CustomersComponent } from 'src/app/views/customers/customers.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';

import { SettingsComponent } from 'src/app/views/settings/settings.component';
import { UsersComponent } from 'src/app/views/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'callList', component: CallListComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
