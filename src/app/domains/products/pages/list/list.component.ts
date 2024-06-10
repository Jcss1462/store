import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component';
import { Product } from './../../../shared/models/product.model';
import { HeaderComponent } from './../../../shared/components/header/header.component';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent,HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  
  private  cartService= inject(CartService);
  cart =this.cartService.cart;
  total =this.cartService.total;

  constructor(){
    const initProducts: Product[]=[
      {
        id:1,
        title: "Pro 1",
        price: 100,
        image: "https://picsum.photos/640/640?r10",
        creationAt: Date.now().toString()
      },
      {
        id:2,
        title: "Pro 2",
        price: 100,
        image: "https://picsum.photos/640/640?r20",
        creationAt: Date.now().toString()
      }
    ]

    this.products.set(initProducts);
  }

  addToCar(product: Product){

    console.log("estoy en el padre");
    this.cartService.addToCart(product);

  }

}
