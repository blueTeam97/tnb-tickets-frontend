import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlaysComponent } from './pages/plays/plays.component';


const routes: Routes = [
  {
    path: '', component: UserComponent
  },

  { 
    path: 'history', component: HistoryComponent
  },

  { 
    path: 'plays', component: PlaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
