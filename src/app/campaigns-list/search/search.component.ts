import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output() filter: EventEmitter<string> = new EventEmitter();
    searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.filter.emit(this.searchTerm.toLowerCase())
  }
}
