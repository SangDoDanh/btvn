import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // in it data
  products: Product[] = [];
  // paging
  p: number = 1; // Trang hiện tại, mặc định là 1
  pageSize: number = 10; // Số sản phẩm hiển thị trên mỗi trang

  // Cấu hình phân trang
  config = {
    itemsPerPage: this.pageSize,
    currentPage: this.p,
  };

  productName = 'p'; // Điều chỉnh tên sản phẩm tùy theo yêu cầu của bạn
  minPrice = 300;
  maxPrice = 800;
  minAvailableSince = '1999-01-01';
  maxAvailableSince = '2024-12-31';
  status = 'Available';
  categoryId = 1;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });

    this.productService
      .getProductsByFilters(
        this.productName,
        this.minPrice,
        this.maxPrice,
        this.minAvailableSince,
        this.maxAvailableSince,
        this.status,
        this.categoryId,
        '',
        'asc'
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
