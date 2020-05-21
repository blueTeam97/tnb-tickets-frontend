import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatNotifyDialogComponent } from '../mat-notify-dialog/mat-notify-dialog.component';



@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private dialog : MatDialog) { }

  openConfirmDialog(msg : any) {
   return this.dialog.open(MatNotifyDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message : msg
      }
    });
  }
}
