import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }


  getUser() {
    return this.http.get(this.apiUrl + 'api/users');
  }
  removeUser(id: string) {
    return this.http.delete(this.apiUrl + 'api/user/' + id);
  }

  getOrder() {
    return this.http.get(this.apiUrl + 'api/orders');
  }
  removeOrder(id: string) {
    return this.http.delete(this.apiUrl + 'api/order/' + id);
  }
  updateOrderStatus(id: string, body: any) {
    return this.http.put(this.apiUrl + 'api/order/' + id, body);
  }

  getProduct() {
    return this.http.get(this.apiUrl + 'api/products');
  }
  removeProduct(id: string) {
    return this.http.delete(this.apiUrl + 'api/product/' + id);
  }
  addProduct(
    product_name: string, 
    product_color: string, 
    product_size: string, 
    product_price: number, 
    img_url: string, 
    tag: string
  ) {
    const body = {
      "product_name": product_name, 
      "product_color": product_color, 
      "product_size": product_size,
      "product_price": product_price,
      "img_url": img_url,
      "tag": tag,
    }
    return this.http.post(this.apiUrl + 'api/product', body);
  }
}
