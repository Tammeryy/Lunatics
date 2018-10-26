import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  failVertPos: MatSnackBarVerticalPosition = 'top';

  constructor(public snackBar: MatSnackBar,) { }

  successAlert(message: string) {
    this.snackBar.open(message, '', {
        duration: 2000,
    });
  }

  failAlert(message: string) {
    this.snackBar.open(message, '', {
        duration: 3000,
    });
  }
}
