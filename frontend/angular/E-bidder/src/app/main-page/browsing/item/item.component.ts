import {Component, Input, OnInit} from '@angular/core';
import {ItemModel} from "../item.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() Item: ItemModel;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goto_item(ItemID: number){
    this.router.navigate(['/main', ItemID],{relativeTo: this.route});
  }

}
