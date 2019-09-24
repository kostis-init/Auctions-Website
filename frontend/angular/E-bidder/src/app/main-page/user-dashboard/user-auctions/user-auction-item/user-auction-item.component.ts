import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuctionItemModel} from "../../../../shared/Models/AuctionItem.model";
import {HttpClient} from "@angular/common/http";
import {freeItems, items} from "../../../../shared/server-endpoints";
import {RatingService} from "../../rating.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MessagingService} from "../../../messaging/messaging.service";

@Component({
  selector: 'app-user-auction-item',
  templateUrl: './user-auction-item.component.html',
  styleUrls: ['./user-auction-item.component.css']
})
export class UserAuctionItemComponent implements OnInit {

  @Input() AuctionItem:AuctionItemModel;
  @Input() Index:number;
  @Output() AuctionDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() AuctionUpdated: EventEmitter<any> = new EventEmitter<any>();

  NewMessage = this.fb.group({
    ['Message'] : this.fb.control('',Validators.required)
  });

  isCollapsed = true;
  IsActive:boolean;
  isReadonly = false;
  modalRef: BsModalRef;
  Categories:string[]=[];
  Rating:number=3;
  constructor(private modalService: BsModalService,
              private http:HttpClient,
              private RateService:RatingService,
              private fb:FormBuilder,
              private MessagingService:MessagingService) { }


  overStar: number | undefined;
  percent: number;

  Send(){
    this.MessagingService.SendMessage(
      this.NewMessage.get('Message').value,
      this.AuctionItem.bids[this.AuctionItem.bids.length - 1].bidder.id
    ).subscribe();
    this.CloseModal();
  }

  onRate(){
    this.RateService.RateBuyer(this.Rating, this.AuctionItem.bids[this.AuctionItem.bids.length-1].bidder.id).subscribe();
    this.modalRef.hide();
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / 5) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }


  ngOnInit() {
    this.CheckIfAuctionHasStarted(this.AuctionItem.startedAt);
    this.GetCategories(this.AuctionItem.categories);
  }

  GetCategories(categories){
    for (let category of categories){
      this.Categories.push(category.name);
    }
  }


  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  convertStrToDate(AuctionDate){
    const str = AuctionDate.split('-');
    const str1 = str[2].split(' ');
    str[2]=str1[0];
    str.push(str1[1]);
    const strTime = str[3].split(":");
    str[3]=strTime[0];
    str.push(strTime[1]);
    str.push(strTime[2]);
    return new Date(str[0],str[1]-1,str[2],str[3],str[4],str[5]);
  }

  CheckIfAuctionHasStarted(AuctionDate){
    const StartDate = this.convertStrToDate(AuctionDate);
    this.IsActive = StartDate.valueOf() <= Date.now();
  }

  ItemDeleted(index){
    this.http.delete<AuctionItemModel>(items+'/'+this.AuctionItem.id).subscribe(
      ()=>{
        this.AuctionDeleted.emit(index);
        this.modalRef.hide();
      }
    );

  }

  Update(id){
    this.http.get<AuctionItemModel>(freeItems+'/'+id).subscribe(
      (NewItem:AuctionItemModel)=>{
        this.AuctionUpdated.emit(NewItem);
        this.modalRef.hide();

      }
    )
  }

}
