import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  //@Input() means it gets value from parent
  @Input() product: Product | undefined;

  //@Output() is how you send a value outside of your component to parent components
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

}
