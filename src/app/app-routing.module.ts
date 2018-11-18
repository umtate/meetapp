import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'group', component: GroupsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: '/settings', pathMatch: 'full'}

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
