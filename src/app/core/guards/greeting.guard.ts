import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GreetingService } from "../../modules/home/services/greeting.service";

@Injectable()
export class GreetingGuard implements CanActivate {
  constructor(private readonly greetingService: GreetingService,
              private readonly router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.greetingService.isGreeted) {
      return true;
    }

    return this.router.navigateByUrl('/greeting')
      .then(() => {
        return false;
      });
  }

}
