import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/store/auth.reducer";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {MainPageState} from "../../store/main-page.reducer";
import {CategoryModel} from "../../../shared/Models/category.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  modalRef: BsModalRef;
  AuthState$: Observable<AuthState>;
  MainPageState$: Observable<MainPageState>;


  categories: CategoryModel[];


  constructor(private store: Store<AppState>,
              private modalServise: BsModalService,
              private router: Router,
              private auth: AuthService){ }

  ngOnInit() {
    this.AuthState$ = this.store.select('auth');
    this.MainPageState$ = this.store.select('mainPage');
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServise.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  Logout() {
    this.auth.Logout();
  }

}
