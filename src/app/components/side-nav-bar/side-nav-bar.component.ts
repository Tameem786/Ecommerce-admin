import { Component, OnInit } from '@angular/core';
import { SideNavMenuItemService } from 'src/app/services/side-nav-menu-item.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
   isOpen = false;

   constructor(private itemService: SideNavMenuItemService) {}

   ngOnInit(): void {
     this.itemService.getBar().subscribe((value) => {
      this.isOpen = value;
     })
   }

   selectItem(item: string) {
    this.itemService.setItem(item);
  }
}
