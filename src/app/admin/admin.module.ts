import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPlayComponent } from './add-play/add-play.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, AddPlayComponent, TicketsListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddPlayComponent,
    ConfirmationDialogComponent
  ]
})
export class AdminModule { }
