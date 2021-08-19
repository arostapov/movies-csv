import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
  constructor() {
  }

  public get isGreeted(): boolean {
    return !!localStorage.getItem('greeting');
  }

  public set isGreeted(value: boolean) {
    localStorage.setItem('greeting', String(value));
  }
}
