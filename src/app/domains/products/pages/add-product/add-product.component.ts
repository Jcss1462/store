import { Component, inject, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  categories = signal<Category[]>([]);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  imageArray = signal<string[]>([""]);

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategories();

    this.productForm = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", Validators.required],
      price: [100, Validators.required],
      categoryId: [0, Validators.required],
      images: [[""], Validators.minLength(1)]
      // Añade otros campos necesarios
    }) as FormGroup & { value: Product };

  }



  private getCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: () => {

        }
      })
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      
      this.productForm.patchValue({
        images: this.imageArray()
      });

      console.log(this.productForm.value);

      this.productService.addProduct(this.productForm.value).subscribe(
        response => {
          alert("producto creado con exito");
        },
        error => {
          alert('Error al crear el producto:' + error);
          console.log(error);
        }
      );;
    } else {
      alert("campos obligatorios pendientes");
    }
  }

  addImage() {

    this.imageArray.update(arr => [...arr, ""]);
  }


  changeImage(index:number, event:Event) {

    const input = event.target as HTMLInputElement;

    this.imageArray.update(arr => {
      // Copia el array actual
      const newArray = [...arr];
      // Actualiza el elemento en la posición especificada
      if (index >= 0 && index < newArray.length) {
        newArray[index] = input.value;
      }
      return newArray;
    });

  }

}
