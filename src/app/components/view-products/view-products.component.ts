import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent {
  displayedColumns: string[] = ['position', 'product_name', 'product_color', 'product_size', 'product_price', 'tag', 'img_url', 'action'];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  productForm = new FormGroup({
      productName: new FormControl(''),
      productPrice: new FormControl(0),
      productUrl: new FormControl(''),
      productColor: new FormControl(''),
      productSize: new FormControl(''),
      productTag: new FormControl('')
  });
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((value: any) => {
      this.ELEMENT_DATA = value;
      this.dataSource.data = [...this.ELEMENT_DATA];
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  removeItem(id: string, index: number) {
    this.api.removeProduct(id).subscribe((value) => {
      console.log(value);
      this.ELEMENT_DATA.splice(index, 1);
      this.dataSource.data = [...this.ELEMENT_DATA]
    })
  }

  onSubmit() {
    this.api.addProduct(
      this.productForm.value.productName || '',
      this.productForm.value.productColor || '',
      this.productForm.value.productSize || '',
      this.productForm.value.productPrice || 0,
      '../../../assets/images/products/' + this.productForm.value.productUrl || '',
      this.productForm.value.productTag || ''
      ).subscribe((value) => {
        console.log(value);
        this.dataSource.data = [...this.ELEMENT_DATA, value]
        this.productForm.reset()
    })
  }
  
}

