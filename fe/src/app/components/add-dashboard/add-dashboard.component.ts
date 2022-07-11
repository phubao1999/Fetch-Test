import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BRAND_STATUS } from 'src/app/constants/brand-status.contants';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss'],
})
export class AddDashboardComponent implements OnInit {
  readonly statusOptions = [
    { viewValue: 'Active', value: BRAND_STATUS.ACTIVE },
    { viewValue: 'Inactive', value: BRAND_STATUS.INACTIVE },
  ];

  selectedFile: ImageSnippet | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}
