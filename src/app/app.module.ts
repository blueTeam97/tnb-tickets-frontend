import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, httpInterceptorProviders } from './interceptor/auth.interceptor';
import { PlaysFilterPipe } from 'src/app/pipes/plays-filter.pipe';

import { CustomMaterialModule } from './custom-material/custom-material.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    NgbActiveModal,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
