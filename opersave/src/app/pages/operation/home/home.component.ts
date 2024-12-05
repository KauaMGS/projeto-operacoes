import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchQuery: string = '';

  constructor(private route: Router){ }

  openCreatePage(){
    this.route.navigateByUrl('create');
  }

  updateSearchQuery(query: string) {
    this.searchQuery = query;
  }
  
}
