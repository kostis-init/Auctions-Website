import {Component, Input, OnInit} from '@angular/core';
import {UserDataModel} from "../../../shared/user-data.model";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: UserDataModel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
