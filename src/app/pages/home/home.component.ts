import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cols = 3;
  category: string | undefined;
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory
  }

}
