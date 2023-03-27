import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent implements OnInit {
  //@Output() is how you send a vlaue outside of your component to parent components
  @Output() columnsCountChange = new EventEmitter<number>()

  sort = 'desc';
  itemsShowCount = 12;
  ;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  //the value gets sent out into the parent here with this emit
  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
