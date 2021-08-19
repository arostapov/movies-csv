import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GreetingGuard} from "./guards/greeting.guard";
import {GreetingService} from "../modules/home/services/greeting.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "../modules/home/home.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [],
  providers: [
    GreetingGuard,
    GreetingService,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
  ]
})
export class CoreModule { }
