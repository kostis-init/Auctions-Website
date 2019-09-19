import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenMapComponent } from './open-map/open-map.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NewAuctionFormComponent } from './new-auction-form/new-auction-form.component';
import {SaveAuctionService} from "./new-auction-form/save-auction.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [OpenMapComponent, AccessDeniedComponent, NewAuctionFormComponent],
  exports: [
    OpenMapComponent,
    NewAuctionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers:[SaveAuctionService]
})
export class SharedModule { }
