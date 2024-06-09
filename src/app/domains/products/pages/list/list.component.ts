import { Component } from '@angular/core';
import { ProductComponent } from './../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  fromChild(event: string){

    console.log("estoy en el padre");
    console.log(event);

  }

}
