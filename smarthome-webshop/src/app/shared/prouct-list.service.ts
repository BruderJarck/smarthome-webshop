import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProuctListService {

  constructor() { }

  private productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  public products: Observable<ProductModel[]> = this.productsSubject.asObservable();


  getProducts(): ProductModel[] {
    return this.productsSubject.value;
  }

  addProduct(product: ProductModel[]): void {
    this.clearProducts()
    const products = [...this.productsSubject.value, ...product];
    this.productsSubject.next(products);
  }

  clearProducts(): void {
    this.productsSubject.next([]);
  }
}

