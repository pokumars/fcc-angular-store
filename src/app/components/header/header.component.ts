import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemQuantity = 0

  @Input()
  get cart(): Cart {
    return this._cart
  }
  set cart(cartParam: Cart) {
    this._cart = cartParam;

    this.itemQuantity = cartParam.items
      .map((itemParam) => itemParam.quantity)
      .reduce((accumulator, current) => accumulator + current, 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  clearCart(): void {
    this.cartService.clearCart()
  }

  constructor(private cartService: CartService) { }
  ngOnInit(): void {

  }
}
