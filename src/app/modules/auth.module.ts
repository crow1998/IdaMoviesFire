import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from '../components/auth/profile/profile.component';
import { AuthRoutingModule } from './routing-modules/auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
