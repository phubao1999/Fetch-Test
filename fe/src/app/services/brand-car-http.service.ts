import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrandRequest } from '../interface/brand-request.interface';
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

  getDetailsBrand(id: string): Observable<HttpBaseResponse<CarBrand[]>> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<HttpBaseResponse<CarBrand[]>>(url);
  }

  createBrand(body: BrandRequest): Observable<HttpBaseResponse<any>> {
    return this.http.post<HttpBaseResponse<any>>(this.baseUrl, body);
  }

  updateBrand(
    id: string,
    body: BrandRequest
  ): Observable<HttpBaseResponse<any>> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<HttpBaseResponse<any>>(url, body);
  }

  deleteBrand(id: string): Observable<HttpBaseResponse<any>> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<HttpBaseResponse<any>>(url);
  }

  searchBrand(searchKey: string): Observable<HttpBaseResponse<CarBrand[]>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', searchKey);

    return this.http
      .get<any>(this.baseUrl, { params: queryParams })
      .pipe(map((data) => this.mappingListBrand(data)));
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
