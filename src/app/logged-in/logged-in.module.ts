import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { LoggedInComponent } from './logged-in.component';
import { NavComponent } from './nav/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrComponent } from '../toastr/toastr.component';

@NgModule({
  declarations: [LoggedInComponent, NavComponent],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbDropdownModule,
    LoggedInRoutingModule,
    FontAwesomeModule
  ]
})
export class LoggedInModule { }
