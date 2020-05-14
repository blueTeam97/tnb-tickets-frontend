import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlaysComponent } from './pages/plays/plays.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [UserComponent, HistoryComponent, PlaysComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule
  ]
})
export class UserModule { }
