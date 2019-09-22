import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuctionItemModel} from "../../../shared/Models/AuctionItem.model";
import {PageChangedEvent} from "ngx-bootstrap";
import {purchases} from "../../../shared/server-endpoints";

@Component({
  selector: 'app-user-purcheses',
  templateUrl: './user-purcheses.component.html',
  styleUrls: ['./user-purcheses.component.css']
})
export class UserPurchesesComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  isLoading = true;
  UserPurchases:AuctionItemModel[]=[];
  returnedArray:AuctionItemModel[]=[];


  ngOnInit() {
    this.http.get<AuctionItemModel[]>(purchases).subscribe(
      (items:AuctionItemModel[])=>{
        this.UserPurchases = items;
        this.isLoading = false;
        this.returnedArray = this.UserPurchases.slice(0,1);
      }
    )
  }

  pageChanged(event: PageChangedEvent) {
    const start = (event.page - 1) * event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.returnedArray = this.UserPurchases.slice(start, end);
  }

}
