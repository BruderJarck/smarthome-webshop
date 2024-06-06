export interface ProductModel {
    id: number;
    name: string;
    img: File;
    description: string;
    price: number;
    category: string
    short_descriptions: string
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
    ip_address: any;
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
  }

  export interface OrderingTypeModel {
    name: string
    displayname: string
  }