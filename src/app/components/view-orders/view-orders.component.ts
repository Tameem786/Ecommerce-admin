import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent {
  displayedColumns: string[] = ['no', 'order_by', 'order_amount', 'order_item', 'order_status', 'action'];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  orderStatus: string = '';
  status = ['received', 'processing', 'shipped', 'delivery']
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getOrder().subscribe((value: any) => {
      console.log(value)
      this.ELEMENT_DATA = value;
      this.dataSource.data = [...this.ELEMENT_DATA];
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  removeItem(id: string, index: number) {
    this.api.removeOrder(id).subscribe((value) => {
      console.log(value);
      this.ELEMENT_DATA.splice(index, 1)
      this.dataSource.data = [...this.ELEMENT_DATA]
    })
  }

  changeStatus(id: string, currVal: number) {
    this.api.updateOrderStatus(id, { order_status: currVal+25 }).subscribe((value: any) => {
      console.log(value);
      this.ELEMENT_DATA = value;
      this.dataSource.data = [...this.ELEMENT_DATA];
    })
  }
}
