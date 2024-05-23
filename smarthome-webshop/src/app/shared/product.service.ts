import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyObject } from 'chart.js/types/basic';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../product';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductModel[] = [];

  constructor(private http: HttpClient, private accService: AccountService) {}

  private baseURL = environment.baseURL
  private productsURL = this.baseURL + 'products/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsURL);
  }

  getProduct(id: number): Observable<ProductModel> {
    const url = this.productsURL + id + "/";
    return this.http.get<ProductModel>(url);
  }

  updateProduct(product: ProductModel): Observable<any> {
    return this.http.put(this.productsURL, product);
  }

  newProduct(data: FormData) {
    console.log(data.get('name'), data.get('img'));
    return this.http.post(this.productsURL, data);
  }

  deleteProduct(product_id: number) {
    const url = this.productsURL + product_id;
    return this.http.delete<ProductModel>(url);
  }

  searchProducts(term: string): Observable<ProductModel[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ProductModel[]>(`${this.productsURL}?search=${term}`);
  }

  submit_order(email:string, products:AnyObject[]) {
    return this.http.post(this.productsURL + "submit_order/", {
      "email": email,
      "products": products,
    }) 
  }
}
