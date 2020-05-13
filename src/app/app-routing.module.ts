import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { HistoryComponent } from './user/pages/history/history.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: '',
    loadChildren: () => import('./logged-in/logged-in.module').then(m => m.LoggedInModule),
    canActivate: [LoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
