import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(category_id?:string) {

    const url=new URL("https://api.escuelajs.co/api/v1/products");

    if(category_id){
      url.searchParams.set("categoryId",category_id);
    }

    let response: Observable<Product[]> = this.http.get<Product[]>(url.toString())

    let imageCorrectionResponse = response.pipe(
      map(products => products.map(product => {
        // Remover el primer y el último carácter de la propiedad image
        product.images[0] = product.images[0].slice(2, -1);
        return product;
      }))
    )

    return imageCorrectionResponse;
  }

  getOne(id: string) {

    let response: Observable<Product> = this.http.get<Product>('https://api.escuelajs.co/api/v1/products/' + id)

    let imageCorrectionResponse = response.pipe(
      map(products => ({
        ...products,
        images: products.images.map(item => item.slice(2, -1))
      }))
    );

    return imageCorrectionResponse;
  }

  addProduct(product: Product) {

    return this.http.post<Product>( 'https://api.escuelajs.co/api/v1/products/', product);
    
  }
}
