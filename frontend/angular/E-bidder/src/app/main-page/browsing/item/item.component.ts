import {Component, Input, OnInit} from '@angular/core';
import {ItemModel} from "../item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() Item: ItemModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dom: DomSanitizer) { }

  ngOnInit() {
    let uints = new Uint8Array(this.Item.images[0]);
    let stringchar = String.fromCharCode.apply(null, uints);
    let base64 = btoa(stringchar);
    this.Item.imageUrl = base64;

  }

  goto_item(ItemID: number){
    this.router.navigateByUrl('/main/items/' + ItemID);
  }

}
