import { Component, OnInit } from '@angular/core';
import { SideNavMenuItemService } from 'src/app/services/side-nav-menu-item.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  selectedItem: string = '';
  isOpen = false;

  constructor(private itemService: SideNavMenuItemService, private sideBar: SideNavMenuItemService) {}

  ngOnInit(): void {
    console.log('Dashboard');
    this.itemService.getItem().subscribe((value: any) => {
      this.selectedItem = value
    })

    this.sideBar.getBar().subscribe((value) => {
      this.isOpen = value;
    })
  }

  selectItem(item: string) {
    this.itemService.setItem(item);
  }

  open() {
    this.sideBar.openBar();
  }
}
