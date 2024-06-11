import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: string
  private productService= inject(ProductService);
  private cartService= inject(CartService);

  product = signal<Product | null>(null);
  cover= signal<string|undefined>("");

  ngOnInit(): void {
    
    if(this.id){
      
      this.productService.getOne(this.id).subscribe({
        next: (product) =>{
          this.product.set(product)   

          if(this.product() && this.product()?.images[0]){
            this.cover.set(this.product()?.images[0]);
          }
        },
        error(err) {
          console.error('Error fetching products:', err);
        },
      });
     

    }
    
  }

  changeCover(index:number){
    this.cover.set(this.product()?.images[index]);
  }

  addToCar(product: Product|null){
    if(product){
      this.cartService.addToCart(product);
    }
  }

}


