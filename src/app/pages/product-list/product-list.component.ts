import { Component,OnInit } from '@angular/core';
import { product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  isForm: boolean =false;
  isEdit:boolean = false;
  products: product[]=[];
  productModel: product=new product();
  
  constructor(private productService: ProductService) {this.isForm = false; }

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.products = this.productService.getAllProducts();
  }
  toggleForm(){
    this.isForm =! this.isForm;
  }
  toggleEdit(id: number){
    this.isEdit=!this.isEdit;
    this.productModel=this.productService.getProductById(id)
  }
  closeEdit(){
    this.isEdit=!this.isEdit;
  }
  addNewProduct(frm:NgForm){
    this.productService.add(frm);
  }
  

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts(); // Cập nhật danh sách sau khi xóa sản phẩm
  }

  editProduct(frm: NgForm) {
    if (frm.valid) {
      const idIndex= this.products.length +1;
      const img= frm.value.image.toString();
      const start= img.lastIndexOf('\\')+1;
      const end= img.lastIndexOf('.');
      const imgName= img.slice(start)
      const updatedProduct = {
        id: frm.value.id,
        name: frm.value.name,
        image: imgName, // Lấy tên tệp từ input file
        type: frm.value.type,
        stock: frm.value.stock,
        price: frm.value.price
      };

      this.productService.editProduct(updatedProduct);
      this.loadProducts(); // Cập nhật danh sách sau khi chỉnh sửa sản phẩm
      this.closeEdit();
    }
    
  }
}
