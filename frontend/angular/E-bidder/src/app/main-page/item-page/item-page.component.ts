import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ItemModel} from "../browsing/item.model";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})

export class ItemPageComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemObservable: Observable<ItemModel>;
  Item: ItemModel;
  modalRef: BsModalRef;
  new_bid: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dom: DomSanitizer,
              private  httpClient: HttpClient,
              private modalService: BsModalService,) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      this.getItem();
    });
    this.getItem();
  }

  getItem() {
    const Item_id = this.route.snapshot.paramMap.get('id');
    this.ItemObservable = this.httpClient.get<ItemModel>(this.ROOT_URL + '/freeitems/' + Item_id);
    this.ItemObservable.subscribe(item => this.Item = item);
  }

  placeBid() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    this.httpClient.post(this.ROOT_URL + '/bids/' + this.Item.id, {amount: this.new_bid}, httpOptions).toPromise();

    this.getItem();
    this.modalRef.hide();

    this.router.navigateByUrl('main/items/' + this.Item.id);

  }

  buyNow() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    this.httpClient.post(this.ROOT_URL + '/items/' + this.Item.id + '/buynow', {}, httpOptions).toPromise();

    this.modalRef.hide();
    this.router.navigateByUrl('/main/dashboard');
  }

  checkPrice(bid: NgForm, template: TemplateRef<any>){
    this.new_bid = bid.value.newBid;

    if (this.new_bid <= this.Item.currentBid) {
      console.log('New bid must be higher');
      return;
    }

    this.OpenModal(template);

  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }
}
