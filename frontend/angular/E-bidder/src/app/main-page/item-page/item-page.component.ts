import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ItemModel} from "../browsing/item.model";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {AuthState} from "../../auth/store/auth.reducer";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})

export class ItemPageComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemObservable: Observable<ItemModel>;
  auth$: Observable<AuthState>;
  Item: ItemModel;
  imagesUrl: string[];
  modalRef: BsModalRef;
  new_bid: number;
  //variable used to display error message on low bid
  low_bid: boolean;
  //Image in the big box
  BigImageUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dom: DomSanitizer,
              private httpClient: HttpClient,
              private modalService: BsModalService,
              private store:Store<AppState>) { }

  ngOnInit() {
    this.low_bid = false;
    this.auth$ = this.store.select('auth');
    this.router.events.subscribe((event) => {
      this.getItem();
    });
    this.getItem();
  }

  getItem() {
    const Item_id = this.route.snapshot.paramMap.get('id');
    this.ItemObservable = this.httpClient.get<ItemModel>(this.ROOT_URL + '/freeitems/' + Item_id);
    this.ItemObservable.subscribe(item => {this.Item = item; this.load_images();});
  }

  load_images() {
    let i: number;
    this.imagesUrl = [];
    i = 0;
    for (let image of this.Item.images) {
      let uints = new Uint8Array(image);
      let stringchar = String.fromCharCode.apply(null, uints);
      let base64 = btoa(stringchar);
      this.imagesUrl[i] = base64;
      i++;
    }
    this.BigImageUrl = this.imagesUrl[0];
  }

  placeBid() {

    this.httpClient.post(this.ROOT_URL + '/bids/' + this.Item.id, {amount: this.new_bid}).toPromise();

    this.getItem();
    this.modalRef.hide();
    this.low_bid = false;

    //tricking the router that the navigation has ended
    this.router.navigated = false;
    this.router.navigateByUrl('/main/items/' + this.Item.id);

  }

  buyNow() {

    this.httpClient.post(this.ROOT_URL + '/items/' + this.Item.id + '/buynow', {}).toPromise();

    this.modalRef.hide();
    this.router.navigateByUrl('/main/dashboard/purchases');
  }

  checkPrice(bid: NgForm, template: TemplateRef<any>){
    this.new_bid = bid.value.newBid;

    if (this.new_bid <= this.Item.currentBid) {
      this.low_bid = true;
      console.log('New bid must be higher');
      return;
    }

    this.OpenModal(template);

  }

  setBigImage(image: string) {
    this.BigImageUrl = image;
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }
}
