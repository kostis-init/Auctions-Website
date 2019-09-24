import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AuctionItemModel} from "../../../../shared/Models/AuctionItem.model";
import {FormBuilder, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {RatingService} from "../../rating.service";
import {MessagingService} from "../../../messaging/messaging.service";

@Component({
  selector: 'app-user-purchase-item',
  templateUrl: './user-purchase-item.component.html',
  styleUrls: ['./user-purchase-item.component.css']
})
export class UserPurchaseItemComponent implements OnInit {

  @Input() PurchaseItem:AuctionItemModel;
  Categories:string[] = [];
  BuyPrice:number;
  isReadonly=false;
  PurchaseDate: string;
  modalRef: BsModalRef;
  overStar: number | undefined;
  percent: number;
  Rating:number=3;
  NewMessage = this.fb.group({
    ['Message'] : this.fb.control('',Validators.required)
  });

  constructor(private fb:FormBuilder, private modalService: BsModalService,private RateService:RatingService,
              private MessagingService:MessagingService) { }

  ngOnInit() {
    this.ItemSetup()
  }


  ItemSetup(){
    this.GetCategories(this.PurchaseItem.categories);
    this.GetBuyPriceAndPurchaseDate();
  }

  GetBuyPriceAndPurchaseDate(){
    let bidsLenght = this.PurchaseItem.bids.length;
    this.BuyPrice=this.PurchaseItem.bids[bidsLenght-1].amount;
    this.PurchaseDate=this.PurchaseItem.bids[bidsLenght-1].time;
  }


  GetCategories(categories){
    for (let category of categories){
      this.Categories.push(category.name);
    }
  }

  Send(){
    this.MessagingService.SendMessage(
      this.NewMessage.get('Message').value,
      this.PurchaseItem.seller.id,
    ).subscribe();
    this.CloseModal();
  }

  onRate(){
    this.RateService.RateSeller(this.Rating, this.PurchaseItem.seller.id).subscribe();
    this.modalRef.hide();
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / 5) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

}
