import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface ProductModel {
  id: number;
  name: string;
  img: File;
  description: string
  price: number;
  category: string
  short_descriptions: string
}
export interface PaginatedProductModel {
  count: number
  next: string
  previous: string
  results: ProductModel[]
}

export interface RespModel {
  access: string;
  refresh: string;
}

export interface SensorValueModel {
  id: number;
  sensor_id: number;
  name: string;
  temp: number;
  hum: number;
  pres: number;
  dt: string;
}

export interface SensorModel {
  id: number;
  name: string;
  location: string;
  data: any;
  ip_address: string;
}

export interface UserModel {
  id: number;
  username: string;
  email: string;
  profile_picture: string
}

export interface OrderModel {
  product: number
  user: number
  status: string
}

export interface ProductCategoryModel {
  id: number
  name: string
  displayname: string
  selected: boolean
}

export interface OrderingTypeModel {
  id: number
  name: string
  displayname: string
}

export interface TotalCountModel {
  total_count: number
}