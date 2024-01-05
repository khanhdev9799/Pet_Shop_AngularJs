import { Injectable } from '@angular/core';
import { product } from '../models/product.model';
import { cart } from '../models/cart.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productModel: product;
  products: product[] =[];
  carts: cart[]=[];
  total: number=0
  constructor() {
    this.productModel = new product();
    this.loadProducts(); 
    this.loadCarts();
  }
  
  private loadProducts(): void {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      // Nếu không có dữ liệu trong localStorage, sử dụng một danh sách mẫu
      this.products = [
        
      ];
      this.saveProducts();
    }
  }
  
  private saveProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
  private loadCarts(): void {
    const storedCarts = localStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
    } else {
      this.carts = [];
      this.saveCarts();
    }
  }
  
  private saveCarts(): void {
    localStorage.setItem('carts', JSON.stringify(this.carts));
}
  // Thêm sản phẩm mới
  add(frm: NgForm){
    if (frm.valid){
      const idIndex= this.products.length +1;
      const img= frm.value.image.toString();
      const start= img.lastIndexOf('\\')+1;
      const end= img.lastIndexOf('.');
      const imgName= img.slice(start)
      this.products.push({
        id: idIndex,
        name: frm.value.name,
        image: imgName,
        price: frm.value.price,
        type: frm.value.type,
        stock: frm.value.stock,
      });
    }
    this.saveProducts();
    console.log(this.products);
    
  }

  // Xoá sản phẩm
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    
    for (let i = id-1; i < this.products.length; i++) {
      this.products[i].id--;
    }
  
    this.saveProducts();
  }

   // Hàm để chỉnh sửa thông tin sản phẩm dựa trên ID
   editProduct(updatedProduct: product) {
    const productIndex = this.products.findIndex(product => product.id === updatedProduct.id);
    if (productIndex !== -1) {
      this.products[productIndex] = updatedProduct;
    }
    this.saveProducts();
    console.log(this.products);
  }

  getAllProducts(): product[] {
    return this.products;
  }
  getAllCarts(): cart[] {
    return this.carts;
  }

  getProductById(id: number): any {
    return this.products.find(product => product.id === id);
  }

  // Thêm sản phẩm vào giỏ hàng
 addToCart(product: product) {
  const existingItem = this.carts.find(item => item.id === product.id);

  if (existingItem) {
   existingItem.quantity++;
   product
  } else {
   this.carts.push({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    type: product.type,
    quantity: 1
   });
  }
  const productIndex = this.products.findIndex(p => p.id === product.id);
  if (productIndex !== -1) {
   this.products[productIndex].stock--; // Giảm số lượng tồn kho
  }
  this.saveCarts();
  this.saveProducts();
  this.outProducts(this.products[productIndex].stock,this.products[productIndex].name);
  this.calculateTotal();
   
 }

 // Tính tổng giá trị của giỏ hàng
 calculateTotal() {
  this.total = this.carts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  return this.total.toLocaleString();
 }
isOutOfStock(item: any): boolean {
  const product = this.products.find(p => p.id === item.id);
  return product ? product.stock === 0 : true;
 }
 increaseQuantity(item: cart) {
  const productIndex = this.products.findIndex(p => p.id === item.id);
  if (productIndex !== -1 && this.products[productIndex].stock>0) {
   item.quantity++;
   this.products[productIndex].stock--; // Giảm số lượng tồn kho
  }
  this.saveCarts();
  this.saveProducts();
  this.outProducts(this.products[productIndex].stock,this.products[productIndex].name);
  this.calculateTotal();
 }
 outProducts(stock: any,name:any){
  if(stock===0){
   alert(name +' hết hàng');
  }

 }

 decreaseQuantity(item: cart) {
  const productIndex = this.products.findIndex(p => p.id === item.id);
  const cartIndex = this.carts.findIndex(c => c.id === item.id);
  if (productIndex !== -1 && item.quantity > 0) {
   item.quantity--;
   this.products[productIndex].stock++; // Tăng số lượng tồn kho
  }
  if(item.quantity === 0){
    this.carts.splice(cartIndex, 1);
    console.log(item.id);
  }
  this.saveCarts();
  this.saveProducts();
  this.calculateTotal();
 }

 invoice(){
  this.carts=[];
  this.total = 0;
  this.saveCarts();
 }

}
