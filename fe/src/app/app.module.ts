import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrandCarHttpService } from './services/brand-car-http.service';
import { FormsModule } from '@angular/forms';
import { AddDashboardComponent } from './components/add-dashboard/add-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  providers: [BrandCarHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
