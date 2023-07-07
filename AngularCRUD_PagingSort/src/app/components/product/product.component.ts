import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { PaginationInstance } from 'ngx-pagination';
import { Category } from 'src/app/model/category';
import { Status } from 'src/app/model/status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Param } from 'src/app/model/param';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // in it data
  products: Product[] = [];
  categories: Category[] = [];
  statusList: Status[] = [];


  // paging
  p: number = 1; // Trang hiện tại, mặc định là 1
  pageSize: number = 10; // Số sản phẩm hiển thị trên mỗi trang
  ord_name: string = '';
  ord_by = '';
  itemsPerPages = [10, 15, 25] ;
  totalElements = 0;

  param: Param ={};
  rfSeach: FormGroup;
  groupName: string[] =[];

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.rfSeach = this.fb.group({
      productName: [''],
      minPrice : [''],
      maxPrice : [''],
      minAvailableSince : [''],
      maxAvailableSince : [''],
      status : [''],
      categoryId: [''],
    });
  }

  ngOnInit(): void {

    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productService.getAllStats().subscribe((data) => {
      this.statusList = data;
    });

    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.totalElements = data.length;
      this.groupName = this.productService.getAllFirstLetter(data);
    });

    
  }

  onSelectChange(e: any) {
    this.pageSize = e.target.value;
    console.log(this.itemsPerPages);
  }

  onBtnSearch() {
    this.param.productName = this.rfSeach.value['productName'];
    this.param.minPrice = this.rfSeach.value['minPrice'];
    this.param.maxPrice = this.rfSeach.value['maxPrice'],
    this.param.minAvailableSince = this.rfSeach.value['minAvailableSince'],
    this.param.maxAvailableSince = this.rfSeach.value['maxAvailableSince'],
    this.param.status = this.rfSeach.value['status'],
    this.param.categoryId = this.rfSeach.value['categoryId'],
    this.param.ord_name = this.ord_name;
    this.param.ord_by = this.ord_by;
    console.log(this.param);
    this.productService
      .getProductsByFilters(this.param)
      .subscribe((data) => {
        this.products = data;
        this.p = 1;
        this.totalElements = data.length;
        this.groupName = this.productService.getAllFirstLetter(data);
      });
  }

  searchProductsByFirstCharacter(firstCharacter: string, element: any) {
    const elementList = document.querySelectorAll('.filter-letter span');
    elementList.forEach((e) => {
      e.classList.remove('btn-active');
    });

    element.target.classList.add('btn-active');

    console.log(firstCharacter);
    if(firstCharacter) {
      this.productService.searchProductsByFirstCharacter(firstCharacter).subscribe(data => {
        this.products = data;
        this.p = 1;
        this.totalElements = data.length;
        console.log(data);
      });
    }
  }
}
