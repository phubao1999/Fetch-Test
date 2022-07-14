import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import {
  BRAND_STATUS,
  TOTAL_MODEL_DEFAULT,
} from 'src/app/constants/brand-status.contants';
import { BrandRequest } from 'src/app/interface/brand-request.interface';
import { CarBrand } from 'src/app/interface/car-brand.interface';
import { BrandCarHttpService } from 'src/app/services/brand-car-http.service';
import { getCurrentTime } from 'src/app/utils/utils';
import { ErrorDialogService } from './../../shared/services/error-dialog.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-details-brand',
  templateUrl: './details-brand.component.html',
  styleUrls: ['./details-brand.component.scss'],
})
export class DetailsBrandComponent implements OnInit, OnDestroy {
  readonly statusOptions = [
    { viewValue: 'Active', value: BRAND_STATUS.ACTIVE },
    { viewValue: 'Inactive', value: BRAND_STATUS.INACTIVE },
  ];
  readonly MODE = {
    VIEW: 'VIEW',
    EDIT: 'EDIT',
  };

  selectedFile: ImageSnippet;
  formAdd: FormGroup;
  screenAction: string = this.MODE.VIEW;
  brandId: string;
  showLoading = false;
  brandDetails: CarBrand;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private brandCarHttpService: BrandCarHttpService,
    private errorDialogService: ErrorDialogService
  ) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.brandId = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailsBrand();
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

  editMode(isEdit: boolean): void {
    this.screenAction = isEdit ? this.MODE.EDIT : this.MODE.VIEW;
    if (this.screenAction === this.MODE.EDIT) {
      this.formAdd.patchValue({
        brandLogo: this.brandDetails.brandLogo,
        brandName: this.brandDetails.brandName,
        brandStatus: this.brandDetails.status,
        brandDescription: this.brandDetails.brandDescription,
      });
    }
  }

  toDashBoard(): void {
    this.router.navigate(['dashboard']);
  }

  updateBrand(): void {
    this.showLoading = true;
    const body: BrandRequest = {
      brandName: this.formAdd.get('brandName')?.value,
      status: this.formAdd.get('brandStatus')?.value,
      brandDescription: this.formAdd.get('brandDescription')?.value,
      brandLogo: this.formAdd.get('brandLogo')?.value,
      totalModel: TOTAL_MODEL_DEFAULT,
      updateAt: getCurrentTime(),
    };
    this.brandCarHttpService
      .updateBrand(this.brandDetails.id, body)
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((res) => {
        if (res.code === 200) {
          this.screenAction = this.MODE.VIEW;
          this.brandDetails = this.mappingDataDetails(body);
          alert(res.message);
        }
      });
  }

  private getDetailsBrand(): void {
    this.showLoading = true;
    this.brandCarHttpService
      .getDetailsBrand(this.brandId)
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((data) => {
        if (data.code === 404) {
          this.errorDialogService.openErrorDialog({
            status: data.code,
            content: data.message,
          });
        } else {
          this.brandDetails = data.data[0];
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

  private mappingDataDetails(req: BrandRequest): CarBrand {
    return {
      id: this.brandDetails.id,
      brandName: req.brandName,
      brandDescription: req.brandDescription,
      brandLogo: req.brandLogo,
      totalModel: req.totalModel,
      updateAt: req.updateAt,
      status: req.status,
    };
  }
}
