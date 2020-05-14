import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent
  },
  {
    path: 'play/:id', component: TicketsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AdminRoutingModule { }
