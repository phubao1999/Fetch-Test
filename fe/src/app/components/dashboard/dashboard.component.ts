import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subject } from 'rxjs';
import { CarBrand } from 'src/app/interface/car-brand.interface';
import { BrandCarHttpService } from 'src/app/services/brand-car-http.service';
import { AddDashboardComponent } from './../add-dashboard/add-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly filterViews = [{ viewValue: 'All', value: 'all' }];
  readonly view = true;

  showLoading = false;
  listBrand: CarBrand[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private brandCarHttp: BrandCarHttpService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.showLoading = true;
    this.brandCarHttp
      .getBrands()
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((data) => {
        this.listBrand = data.data;
      });
  }

  openAddBrand(): void {
    this.dialog.open(AddDashboardComponent, {
      width: '500px',
      disableClose: true,
    });
  }
}
