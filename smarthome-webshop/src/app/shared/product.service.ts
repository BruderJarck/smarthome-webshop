import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyObject } from 'chart.js/types/basic';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel, OrderingTypeModel, ProductCategoryModel as ProductCategoryModel, ProductModel } from '../models';
import { AccountService } from './account.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private accService: AccountService) { }

  private baseURL = environment.baseURL
  private productsURL = this.baseURL + 'products/';
  private orderParam: string = "&odering=name"
  private filterParam: string = ""
  private searchParam: string = ""

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsURL);
  }

  getProduct(name: string): Observable<ProductModel> {
    const url = this.productsURL + name + "/";
    return this.http.get<ProductModel>(url);
  }

  searchProducts(term: string): Observable<ProductModel[]> {
    if (!term.trim()) {
      return of([]);
    }
    this.searchParam = `search=${term}`
    return this.http.get<ProductModel[]>(`${this.productsURL}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
      () => this.searchParam = "search="
    ))
    }

  filterProducts(categorys: ProductCategoryModel[]): Observable<ProductModel[]> {
    const commaString = categorys.map(category => category.name).join(",")
    this.filterParam = `category=${commaString}`
    return this.http.get<ProductModel[]>(`${this.productsURL}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
      () => this.searchParam = "search="
    ))
  }

  orderProducts(ordering_type: string): Observable<ProductModel[]> {
    this.orderParam = `ordering=${ordering_type}`
    return this.http.get<ProductModel[]>(`${this.productsURL}?${this.filterParam}&${this.orderParam}&${this.searchParam}`).pipe(tap(
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
