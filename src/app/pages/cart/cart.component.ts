import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: 'sneakers',
        price: 150,
        quantity: 1,
        id: 1
      },
      {
        product: "https://via.placeholder.com/150",
        name: 'shoe',
        price: 150,
        quantity: 3,
        id: 2
      }
    ]
  };

  displayedColumns: Array<string> = [
    'product', 'name', 'price', 'quantity', 'total', 'action',
  ]

  dataSource: Array<CartItem> = [];

  constructor(private cartService: CartService, private httpClient: HttpClient) { }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;

    })
  }

  onCheckout(): void {
    //request to our local server. The local server will then make a request to stripe, then it will return a session id and using the session d, we can open the checkout page
    this.httpClient.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      //this is the publishable_key
      let stripe = await loadStripe('pk_test_51MoZLaHb2UqU7uvxUfOYtPSAYJY9DmvuAouEgFtJLOmULUlpgulgRcS0zffdRhJH5dHOSLmSkjRprUzXtf5nT27I00ddpMSOwM');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)

  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

}
