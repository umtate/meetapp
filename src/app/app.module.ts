import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes }  from '@angular/router';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';


import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { DataService } from './data.service';
import { AppRoutingModule } from './/app-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    SettingsComponent,
    SpinnerComponent,
    NavbarComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
