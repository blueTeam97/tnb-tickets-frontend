import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { HistoryComponent } from './pages/history/history.component';


const routes: Routes = [
  {
    path: '', component: UserComponent
  },

  { 
    path: 'history', component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
