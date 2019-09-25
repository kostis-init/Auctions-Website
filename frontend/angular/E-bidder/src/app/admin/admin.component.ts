import {Component, OnInit, TemplateRef} from '@angular/core';
import * as fromAdmin from "./store/admin.reducer"
import * as fromActions from "./store/admin.actions";
import {Store} from "@ngrx/store";
import {AuthService} from "../auth/auth.service";
import {AdminLogout} from "./store/admin.actions";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(
    private store: Store<fromAdmin.FeatureState>,
    private auth: AuthService,
    private http:HttpClient,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.store.dispatch(new fromActions.FetchUsers());
  }

  AdminLogout() {
    this.auth.Logout();
    this.store.dispatch(new AdminLogout());
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getXml(){
    this.http.get('http://localhost:8080/restapi/api/admin/export/xml',{responseType:'blob'}).subscribe(
      (data)=>{
        console.log(data);
        const blob = new Blob([data], {type: 'text/plain'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    );

    this.CloseModal();
  }

  getJson(){
    this.http.get('http://localhost:8080/restapi/api/admin/export/json',{responseType:'blob'}).subscribe(
      (data)=>{
        console.log(data);
        const blob = new Blob([data], {type: 'text/plain'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    );

    this.CloseModal();
  }

  CloseModal() {
    this.modalRef.hide();
  }

}
