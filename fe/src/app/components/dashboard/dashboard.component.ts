import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
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
    private router: Router,
    private brandCarHttp: BrandCarHttpService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.showLoading = true;
    this.getNewListBrand();
  }

  openAddBrand(): void {
    const dialogRef = this.dialog.open(AddDashboardComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.getNewListBrand();
        }
      });
  }

  toDetails(item: CarBrand): void {
    this.router.navigate([`details/${item.id}`]);
  }

  deleteBrand(item: CarBrand): void {
    this.showLoading = true;
    this.brandCarHttp
      .deleteBrand(item.id)
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((res) => {
        const index = this.listBrand.indexOf(item);
        if (index > -1) {
          this.listBrand.splice(index, 1);
        }
        alert(res.message);
      });
  }

  private getNewListBrand(): void {
    this.brandCarHttp
      .getBrands()
      .pipe(finalize(() => (this.showLoading = false)))
      .subscribe((data) => {
        this.listBrand = data.data;
      });
  }
}
