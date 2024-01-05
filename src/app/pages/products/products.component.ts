import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/pages/models/product.model';
import { cart } from '../models/cart.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  showInvoice: boolean = false;
  
  products: product[] = [];
  carts: cart[]=[];
  total: any=0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    this.carts = this.productService.getAllCarts();
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: product) {
    this.productService.addToCart(product);
    
  }
  getTotal(){
    this.total=this.productService.calculateTotal();
    return this.total;
  }

  onConfirm() {
    // Hiển thị hóa đơn khi nút "Confirm" được nhấn
    this.showInvoice = true;
    
  }
  closeInvoice() {
    this.showInvoice = false;
  }

  isOutOfStock(item: any): boolean {
    return this.productService.isOutOfStock(item);
  }
  increaseQuantity(item: cart) {
  this.productService.increaseQuantity(item);
  }
  outProducts(stock: any,name:any){
    this.productService.outProducts(stock,name);
  }

  decreaseQuantity(item: cart) {
    this.productService.decreaseQuantity(item);
  }

  invoice(){
    this.productService.invoice();
    this.showInvoice = false;
  }
  
}
