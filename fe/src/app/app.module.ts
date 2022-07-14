import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDashboardComponent } from './components/add-dashboard/add-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsBrandComponent } from './components/details-brand/details-brand.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
import { BrandCarHttpService } from './services/brand-car-http.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDashboardComponent,
    DetailsBrandComponent,
    PageNotFoundComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ],
  providers: [BrandCarHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
