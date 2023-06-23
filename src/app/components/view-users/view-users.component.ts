import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})

export class ViewUsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['position', 'name', 'phone', 'email', 'address', 'action'];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUser().subscribe((value: any) => {
      console.log(value);
      this.ELEMENT_DATA = value;
      this.dataSource.data = [...this.ELEMENT_DATA]
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  removeItem(id: string, index: number) {
    this.api.removeUser(id).subscribe((value) => {
      console.log(value);
      this.ELEMENT_DATA.splice(index, 1)
      this.dataSource.data = [...this.ELEMENT_DATA]
    })
  }
}