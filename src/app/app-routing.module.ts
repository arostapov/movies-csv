import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/components/home/home.component";
import {GreetingComponent} from "./modules/home/components/greeting/greeting.component";
import {GreetingGuard} from "./core/guards/greeting.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GreetingGuard],
  },
  {
    path: 'greeting',
    component: GreetingComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
