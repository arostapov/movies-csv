import { Component, OnInit } from '@angular/core';
import { GreetingService } from "../../services/greeting.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

  constructor(private readonly greetingService: GreetingService,
              private readonly router: Router) { }

  ngOnInit(): void { }

  public letsGo(): void {
    this.greetingService.isGreeted = true;
    this.router.navigate([''], { queryParams: { search: '' } });
  }
}
