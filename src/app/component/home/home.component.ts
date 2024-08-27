import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerServiceService } from '../../services/customer-service.service';

import { ResultServiceService } from '../../services/result-service.service';
import customerData from '../../jsonData/customer.json';  // Adjust the path to your JSON file

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  orderNumber: string = "1";
  Amount: number = 0;

  customers = customerData;
  selectedCustomer: number = 0;
  selectedCustomerDetails: any = null;

  displayedColumns: string[] = ['Item_Id', 'Item_Unit', 'Item_Qty', 'Item_Rate', 'Item_Value'];
  dataSource = new MatTableDataSource<any>();

  constructor(private http: CustomerServiceService, private httpResult: ResultServiceService) {}

  ngOnInit(): void {

    this.getCustomer();

  }

  onCustomerChange() {
    const selectedAccCode = Number(this.selectedCustomer); // Ensure type consistency
    this.selectedCustomerDetails = this.customers.find(
      (customer: any) => customer.acc_code === selectedAccCode
    );
    console.log('Selected Customer Details:', this.selectedCustomerDetails); // Debugging output
  }

  formatDate(event: any) {
    const date = new Date(event.target.value);
    const formattedDate = this.formatToDDMMYYYY(date);
    console.log('Selected Date: ', formattedDate);
  }

  private formatToDDMMYYYY(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getCustomer(){
    this.http.getCustomer().subscribe((response)=>{
      console.log(response);  
    })
  }


}
