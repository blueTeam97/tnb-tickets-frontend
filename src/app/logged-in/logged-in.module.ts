import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { LoggedInComponent } from './logged-in.component';
import { NavComponent } from './nav/nav/nav.component';

import { NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoggedInComponent, NavComponent],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbDropdownModule,
    LoggedInRoutingModule
  ]
})
export class LoggedInModule { }
