import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ComponentsModule } from '../components/components.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminComponent } from './admin/admin.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MedicalReportComponent } from './medical-report/medical-report.component';
import { MembershipComponent } from './membership/membership.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AdminComponent,
    ChatRoomComponent,
    DoctorsListComponent,
    DashboardComponent,
    PerfilComponent,
    MedicalReportComponent,
    MembershipComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
  ],
  exports: [LandingPageComponent],
})
export class PagesModule { }
