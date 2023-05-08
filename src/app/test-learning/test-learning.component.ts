import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-test-learning',
  templateUrl: './test-learning.component.html',
  styles: [
  ]
})
export class TestLearningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  userObservable = new Subject<{ first: string, last: string }>();
  first = ['John', 'Mike', 'Mary', 'Bob'];
  firstIndex = 0;
  last = ['Smith', 'Novotny', 'Angular'];
  lastIndex = 0;

  nextUser() {
    let first = this.first[this.firstIndex++];
    if (this.firstIndex >= this.first.length) this.firstIndex = 0;
    let last = this.last[this.lastIndex++];
    if (this.lastIndex >= this.last.length) this.lastIndex = 0;
    this.userObservable.next({ first, last });
  }

}
