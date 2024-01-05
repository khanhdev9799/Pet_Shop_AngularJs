import { Component } from '@angular/core';
import { product } from './pages/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DACK';

  products: product[] =[
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    },
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    },
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    },
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    },
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    },
    {
      id:1,
      name: 'abc',
      image: 'trung',
      price: 30000,
      type: 'abc',
      stock: 100,
    }
  ];
}
