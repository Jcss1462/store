import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component';
import { Product } from './../../../shared/models/product.model';
import { HeaderComponent } from './../../../shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

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
  private productService= inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) =>{
        console.log(products);
        this.products.set(products);
      },
      error(err) {
        console.error('Error fetching products:', err);
      },
    });
  }
  
  addToCar(product: Product){

    console.log("estoy en el padre");
    this.cartService.addToCart(product);

  }

}
