import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Status } from 'src/app/model/status';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  statusList: Status[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {

    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productService.getAllStats().subscribe((data) => {
      this.statusList = data;
    });

    
    this.productForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      unit_price: ['', Validators.required],
      status: ['', Validators.required],
      available_since: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    let product:Product = {
      product_name: this.productForm.value['product_name'],
      category_id: this.productForm.value['category'].category_id,
      category_name: this.productForm.value['category'].category_name,
      unit_price: this.productForm.value['unit_price'],
      status: this.productForm.value['status'].status_name,
      available_since: this.productForm.value['available_since'],
    };

    this.productService.createProduct(product).subscribe( data => {
      alert(`Add new product success${product.product_name} - ${product.unit_price}`);
        this.router.navigateByUrl('/product');      
    }
    );
  }

}
