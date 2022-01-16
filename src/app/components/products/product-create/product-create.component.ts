import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  propLegal = "qualquer"

  product: Product = {
    id: 0,
    name: '',
    price: 0.0
  }

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  createProduct(): void{
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Producto criado!")
    })
    this.router.navigate(['/products'])
  }
 
  cancel(): void{
    this.router.navigate(['/products'])
  }

}
