import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarBrand } from '../interface/car-brand.interface';
import { HttpBaseResponse } from '../interface/http-base-response.interface';

@Injectable()
export class BrandCarHttpService {
  private baseUrl = `${environment.baseUrl}/brand`;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<HttpBaseResponse<CarBrand[]>> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((data) => this.mappingListBrand(data)));
  }

  getDetailsBrand(id: string): Observable<HttpBaseResponse<CarBrand>> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<HttpBaseResponse<CarBrand>>(url);
  }

  private mappingListBrand(
    data: HttpBaseResponse<any>
  ): HttpBaseResponse<CarBrand[]> {
    return {
      code: data.code,
      data: data.data[0],
      message: data.message,
    };
  }
}
