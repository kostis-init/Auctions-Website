import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {itemModel} from "../../../shared/Models/ItemModel";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuctionItemModel} from "../../../shared/Models/AuctionItem.model";

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
  isCollapsed = true;
  IsActive:boolean;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.CheckIfAuctionHasStarted(this.AuctionItem.startedAt);
    console.log(this.AuctionItem.bids ===null);
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
    return new Date(str[2],str[1]-1,str[0],str[3],str[4],str[5]);
  }

  CheckIfAuctionHasStarted(AuctionDate){
    const StartDate = this.convertStrToDate(AuctionDate);
    this.IsActive = StartDate.valueOf() <= Date.now();
  }

  ItemDeleted(index){
    //send delete req to server;
    this.AuctionDeleted.emit(index);
  }

  Update(NewAuction){
    //make the Auction
    this.AuctionUpdated.emit(NewAuction);
  }

}
