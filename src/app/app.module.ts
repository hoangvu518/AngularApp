import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityComponent } from './pages/security/security.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LeftMenuComponent,
    EmployeeListComponent,
    HomeComponent,
    NotFoundComponent,
    AdminComponent,
    EmployeeEditComponent,
    SecurityComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
],
  bootstrap: [AppComponent]
})
export class AppModule { }
