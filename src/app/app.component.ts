import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    HttpClientModule, 
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'item-list-app';

  // items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  items: string[] = []; //Initialize an empty array to store items
  filteredItems: string[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  filterQuery: string = '';
  
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.loadItems();
  }

  loadItems(){
    this.http.get<any>('https://dog.ceo/api/breeds/list/all')
      .subscribe(
        (data) => {
          this.items = Object.keys(data.message); //assigning the fetched data to items array
          this.filteredItems = [...this.items]; //Initialize filteredItems
        },
        (error) => {
          console.error('Error loading items:', error);
        }
      );
  }

  sortItems(){
    this.filteredItems.sort((a, b) =>{
      const comparison = a.localeCompare(b);
      return this.sortDirection === 'asc' ? comparison: -comparison;
    });
  }

  filterItems(){
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.filterQuery.toLowerCase()));
    this.sortItems(); //Apply sorting after filtering
  }

  toggleSortDirection(){
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortItems();
  }
}