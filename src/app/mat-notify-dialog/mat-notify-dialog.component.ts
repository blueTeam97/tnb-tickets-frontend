import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'app-mat-notify-dialog',
  templateUrl: './mat-notify-dialog.component.html',
  styleUrls: ['./mat-notify-dialog.component.scss']
})
export class MatNotifyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
  public dialogRef : MatDialogRef<MatConfirmDialogComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close(false);
  }
}
