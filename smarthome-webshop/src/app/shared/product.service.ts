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

  private currentPageSizeSource: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  public currentPageSize: Observable<number> = this.currentPageSizeSource.asObservable()

  private currentCategoriesSource: BehaviorSubject<ProductCategoryModel[]> = new BehaviorSubject<ProductCategoryModel[]>([])
  public currentCategories: Observable<ProductCategoryModel[]> = this.currentCategoriesSource.asObservable()

  private currentCheckedCategoriesSource: BehaviorSubject<ProductCategoryModel[]> = new BehaviorSubject<ProductCategoryModel[]>([]);
  public currentCheckedCategorys: Observable<ProductCategoryModel[]> = this.currentCheckedCategoriesSource.asObservable()

  private productListCountSource: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  public productListCount: Observable<Number>= this.productListCountSource.asObservable();

  ngOnInit(){
    this.currentPageSize.subscribe(
      pageSize => {
        this.currentPageSizelocal = pageSize
      })
  }

  updatePageSize(pageSize: number){
    this.currentPageSizeSource.next(pageSize)
  }

  updateCheckedCatregories(categories: ProductCategoryModel[]){
    this.currentCheckedCategoriesSource.next(categories)
  }

  addCategories(categories: ProductCategoryModel[]){
    this.currentCategoriesSource.next(categories)
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
    else{
      this.filterParam = ""
    }

    return this.getProducts(this.currentPageSizelocal)
  }

  orderProducts(ordering_type: string, next?: string): Observable<PaginatedProductModel> {
    this.orderParam = `&ordering=${ordering_type}`
    return this.getProducts(this.currentPageSizelocal)
  }

  submitOrder(username: string, product: any): Observable<OrderModel> {

    return this.http.post<OrderModel>(this.baseURL + "orders/", {
      "user": username,
      "product": product,
    })
  }

  getProductCategorys(): Observable<ProductCategoryModel[]> {

    return this.http.get<ProductCategoryModel[]>(this.baseURL + "categorys/")
  }


}
