import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() Search: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onSearch(query: NgForm) {

    const SearchQuery = query.value.searchQuery;
    const SearchCategory = query.value.category;

    console.log(SearchQuery);
    console.log(SearchCategory);

    this.router.navigateByUrl('/main/browse');
  }

}
