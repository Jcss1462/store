import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) img: string ="";
  @Input({required: true}) price: number = 0;
  @Input({required: true}) title: string ="";

  @Output() outputVar = new EventEmitter();

  addToCartHandler(){
    console.log("click from the child");
    this.outputVar.emit("Mensaje emitido desde el hijo: "+this.title);
  }

}
