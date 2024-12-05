import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(){ }

  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  public search(value: string){
    this.emmitSearch.emit(value);
  }

}
