import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlaysComponent } from './pages/plays/plays.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import { PlaysFilterPipe } from '../pipes/plays-filter.pipe';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [UserComponent, HistoryComponent, PlaysComponent, PlaysFilterPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule,
    QRCodeModule
  ]
})
export class UserModule { }
