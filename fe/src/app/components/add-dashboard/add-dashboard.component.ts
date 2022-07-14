import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Subject } from 'rxjs';
import { BRAND_STATUS } from 'src/app/constants/brand-status.contants';
import { BrandRequest } from 'src/app/interface/brand-request.interface';
import { BrandCarHttpService } from 'src/app/services/brand-car-http.service';
import { getCurrentTime } from './../../utils/utils';

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
  readonly totalModel = 1200;

  selectedFile: ImageSnippet | undefined;
  formAdd: FormGroup;
  showLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private brandCarHttp: BrandCarHttpService,
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
    this.showLoading = true;
    const body: BrandRequest = {
      brandName: this.formAdd.get('brandName')?.value,
      status: this.formAdd.get('brandStatus')?.value,
      brandDescription: this.formAdd.get('brandDescription')?.value,
      brandLogo: this.formAdd.get('brandLogo')?.value,
      totalModel: this.totalModel,
      updateAt: getCurrentTime(),
    };
    this.brandCarHttp
      .createBrand(body)
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((res) => {
        if (res.code === 200) {
          this.dialogRef.close(body);
          alert(res.message);
        }
      });
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
