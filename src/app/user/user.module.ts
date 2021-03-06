import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlaysComponent } from './pages/plays/plays.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PlaysFilterPipe } from '../pipes/plays-filter.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { CountdownComponent } from './pages/countdown/countdown.component';
import {CustomPlayDatePipe} from './../pipes/custom-play-date.pipe';
import { DateTransformPipe } from './../pipes/date-transform.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [UserComponent, HistoryComponent, PlaysComponent, PlaysFilterPipe, CountdownComponent,CustomPlayDatePipe,DateTransformPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule,
    QRCodeModule,
    NgbModule
  ],
  providers: [DatePipe]
})
export class UserModule { }
