import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { ErrorDialogData } from 'src/app/interface/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  private dialogRef: MatDialogRef<ErrorDialogComponent> | null;

  constructor(public dialog: MatDialog, private ngZone: NgZone) {}

  openErrorDialog(errorData: ErrorDialogData): void {
    this.ngZone.run(() => {
      if (!this.dialogRef) {
        this.dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: errorData,
          maxWidth: `${errorData.width ?? 600}px`,
          minWidth: '300px',
          disableClose: false,
        });
        this.dialogRef.afterClosed().subscribe((_) => {
          this.dialogRef = null;
        });
      } else {
        this.dialogRef.componentInstance.data = errorData;
      }
    });
  }
}
