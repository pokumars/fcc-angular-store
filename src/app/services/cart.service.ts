import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackbar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    //finds by reference
    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      items.push(item);
    }

    this.cart.next({ items })
    this._snackbar.open('1 item added to cart', 'Ok', { duration: 3000 })
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);

  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackbar.open('Cart is clear', 'Ok', { duration: 3000 })
  }

  /**
   * 
   * @param item the Item to remove
   * @param update governs two things. 1. should the snackbar notification be triggered here or elsewhere 2. should the updating of the cart happen in here or will some other function do that
   */
  removeFromCart(item: CartItem, update: Boolean = true): Array<CartItem> {
    const flteredItems = this.cart.value.items.filter(_item => _item.id !== item.id)

    if (update) {
      this.cart.next({ items: flteredItems })
      this._snackbar.open('1 item removed from cart', 'Ok', { duration: 3000 })
    }

    return flteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    //filter with .map and subtract 1 when you get to the right product
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        //remove completely when quantity hits 0
        if (_item.quantity === 0) {
          itemForRemoval = _item
        }
      }

      return _item
    })

    if (itemForRemoval) {
      //remove completely when quantity hits 0
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems })
    this._snackbar.open('1 item removed from cart', 'Ok', { duration: 3000 })

  }
}
