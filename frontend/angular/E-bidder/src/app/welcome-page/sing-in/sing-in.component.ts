import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const Username = form.value.username;
    const Password = form.value.password;
    console.log(Username,Password);
  }

}
