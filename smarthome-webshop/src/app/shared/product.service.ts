import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyObject } from 'chart.js/types/basic';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel, PaginatedProductModel, ProductCategoryModel as ProductCategoryModel, ProductModel, TotalCountModel } from '../models';
import { AccountService } from './account.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private accService: AccountService) { }

  private baseURL = environment.baseURL
  private productsURL = this.baseURL + 'products/';
  private orderParam: string = "odering=name"
  private filterParam: string = "category="
  private searchParam: string = "search="
  private limitParam: number = 0
  private offsetParam: number = 0
  private defaultLimitParam: number = 5
  private defaultOffsetParam: number = 0

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getProducts(next?: string, limit?:number ): Observable<PaginatedProductModel> {
    if(limit && next){
      next = next.replace(/limit=(\d+)/, `limit=${limit}`)
    }
    var url = ""
    if (next) {
      url = next
    }
    else {
      url = this.productsURL
    }
    return this.http.get<PaginatedProductModel>(`${url}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
      () => this.searchParam = "search="
    ))
  }

  getProduct(name: string): Observable<ProductModel> {
    const url = this.productsURL + name + "/";
    return this.http.get<ProductModel>(url);
  }

  getTotalProductCount(): Observable<TotalCountModel> {
    return this.http.get<TotalCountModel>(this.baseURL + "total-count/");
  }

  searchProducts(term: string, next?: string): Observable<PaginatedProductModel> {
    if (!term.trim()) {
      return of();
    }
    this.searchParam = `search=${term}`
    return this.getProducts(next = next)

  }

  filterProducts(categorys: ProductCategoryModel[], next?: string): Observable<PaginatedProductModel> {
    const commaString = categorys.map(category => category.name).join(",")
    this.filterParam = `category=${commaString}`
    var url = ""
    if (next) {
      url = next
    }
    else {
      url = this.productsURL
    }
    return this.http.get<PaginatedProductModel>(`${url}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
      () => this.searchParam = "search="
    ))
  }

  orderProducts(ordering_type: string, next?: string): Observable<PaginatedProductModel> {
    this.orderParam = `ordering=${ordering_type}`
    var url = ""
    if (next) {
      url = next
    }
    else {
      url = this.productsURL
    }
    return this.http.get<PaginatedProductModel>(`${url}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
      () => this.searchParam = "search="
    ))
  }

  submitOrder(userId: number, productId: number): Observable<OrderModel> {

    return this.http.post<OrderModel>(this.baseURL + "orders/", {
      "user": userId,
      "product": productId,
    })
  }

  getProductCategorys(): Observable<ProductCategoryModel[]> {

    return this.http.get<ProductCategoryModel[]>(this.baseURL + "categorys/")
  }


}
