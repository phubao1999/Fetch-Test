import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { BRAND_STATUS } from 'src/app/constants/brand-status.contants';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss'],
})
export class AddDashboardComponent implements OnInit, OnDestroy {
  readonly statusOptions = [
    { viewValue: 'Active', value: BRAND_STATUS.ACTIVE },
    { viewValue: 'Inactive', value: BRAND_STATUS.INACTIVE },
  ];

  selectedFile: ImageSnippet | undefined;
  formAdd: FormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.formAdd.patchValue({
        brandLogo: this.selectedFile.src,
      });
    });

    reader.readAsDataURL(file);
  }

  addBrand(): void {
    console.log(this.formAdd.value);
  }

  private initForm(): void {
    this.formAdd = this.formBuilder.group({
      brandLogo: new FormControl('', Validators.required),
      brandName: new FormControl('', Validators.required),
      brandStatus: new FormControl(
        this.statusOptions[0].value,
        Validators.required
      ),
      brandDescription: new FormControl('', Validators.required),
    });
  }
}
