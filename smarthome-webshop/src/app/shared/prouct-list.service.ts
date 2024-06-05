import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProuctListService {

  constructor() { }
  
  private productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  public products$: Observable<ProductModel[]> = this.productsSubject.asObservable();


  // Get current value of products
  getProducts(): ProductModel[] {
    return this.productsSubject.value;
  }

  // Add a new product
  addProduct(product: ProductModel[]): void {
    const products = [...this.productsSubject.value, ...product];
    this.productsSubject.next(products);
  }

  // Clear all products
  clearProducts(): void {
    this.productsSubject.next([]);
  }
}

