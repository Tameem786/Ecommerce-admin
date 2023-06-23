import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavMenuItemService {

  itemSelected: BehaviorSubject<string> = new BehaviorSubject<string>('');
  openSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setItem(item: string) {
    this.itemSelected.next(item);
  }

  getItem(): BehaviorSubject<string> {
    return this.itemSelected;
  }

  openBar() {
    this.openSideBar.next(!this.openSideBar.getValue())
  }

  getBar(): BehaviorSubject<boolean> {
    return this.openSideBar;
  }
}
