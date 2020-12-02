import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { DoctorsListComponent } from './pages/doctors-list/doctors-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembershipComponent } from './pages/membership/membership.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'chats', component: ChatRoomComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  { path: 'doctor-list', component: DoctorsListComponent},
  { path: 'membership', component: MembershipComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
