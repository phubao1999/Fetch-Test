import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorDialogService } from './../shared/services/error-dialog.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private errorDialog: ErrorDialogService) {}

  handleError(error: Error | HttpErrorResponse) {
    console.log('GlobalErrorHandlerService');
    console.error(error);
    this.errorDialog.openErrorDialog({
      status: 500,
      content: error.message,
    });
  }
}
