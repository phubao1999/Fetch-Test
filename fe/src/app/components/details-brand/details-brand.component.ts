import { BrandCarHttpService } from 'src/app/services/brand-car-http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { BRAND_STATUS } from 'src/app/constants/brand-status.contants';

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

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private brandCarHttpService: BrandCarHttpService
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
  }

  addBrand(): void {
    console.log(this.formAdd.value);
  }

  toDashBoard(): void {
    this.router.navigate(['dashboard']);
  }

  private getDetailsBrand(): void {
    this.showLoading = true;
    this.brandCarHttpService
      .getDetailsBrand(this.brandId)
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((data) => {
        console.log(data);
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
