import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  //emit the value so that a parent component can receive it
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  //so that we can unsubscribe when we leave the homepage
  categoriesSubscription: Subscription | undefined

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
      .subscribe((response) => {
        this.categories = [...response, this.storeService.allString];
      });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

}
