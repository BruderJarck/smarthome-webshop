import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel, PaginatedProductModel, ProductCategoryModel as ProductCategoryModel, ProductModel, TotalCountModel } from '../models';
import { ProuctListService } from './prouct-list.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private productListService: ProuctListService) { }

  private baseURL = environment.baseURL
  private productsURL = this.baseURL + 'products/';
  private orderParam: string = ""
  private filterParam: string = ""
  public searchParam: string = ""
  private currentPageSizelocal: number = 5

  public currentPageSiteSource: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  currentPageSize = this.currentPageSiteSource.asObservable();

  private productListCountSource: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  productListCount = this.productListCountSource.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  ngOnInit(){
    this.currentPageSize.subscribe(
      pageSize => {
        this.currentPageSizelocal = pageSize
      })
  }

  setProductListCount(value: number): void {
    this.productListCountSource.next(value);
  }

  getProducts(limit: number, offset?: number): Observable<PaginatedProductModel> {
    var offsetParam: string = ""
    if (offset) {
      offsetParam = "&offset=" + offset
    }
    const paginationUrl = `${this.productsURL}?limit=${limit}${offsetParam}`
    const filterUrl = this.filterParam + this.orderParam + this.searchParam
    const url = paginationUrl + filterUrl

    return this.http.get<PaginatedProductModel>(url).pipe(tap(
      (res) => {
        this.productListCountSource.next(res.count)
        this.productListService.addProduct(res.results)

      }
    ))
  }

  getProduct(name: string): Observable<ProductModel> {
    const url = this.productsURL + name + "/";
    return this.http.get<ProductModel>(url);
  }

  getTotalProductCount(): Observable<TotalCountModel> {
    return this.http.get<TotalCountModel>(this.baseURL + "total-count/");
  }

  // FIXME: gerProducts params
  searchProducts(term: string): Observable<PaginatedProductModel> {
    if (!term.trim()) {
      return of();
    }
    if (term == "") {
      this.searchParam = ""
    }
    else {
      this.searchParam = `&search=${term}`
    }
    return this.getProducts(this.currentPageSizelocal)
  }

  filterProducts(categorys: ProductCategoryModel[], next?: string): Observable<PaginatedProductModel> {
    const commaString = categorys.map(category => category.name).join(",")
    if (commaString != "") {
      this.filterParam = `&category=${commaString}`
    }

    return this.getProducts(this.currentPageSizelocal)
  }

  orderProducts(ordering_type: string, next?: string): Observable<PaginatedProductModel> {
    this.orderParam = `&ordering=${ordering_type}`
    return this.getProducts(this.currentPageSizelocal)
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
