import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { GreetingComponent } from './components/greeting/greeting.component';
import { FormsModule } from "@angular/forms";
import { SearchService } from "./services/search.service";


@NgModule({
  declarations: [
    HomeComponent,
    GreetingComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule,
  ],
  providers: [
    SearchService,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
