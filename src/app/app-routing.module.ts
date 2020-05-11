import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserGuard } from 'src/guards/user.guard';
import { LoggedInGuard } from 'src/guards/logged-in.guard';



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
