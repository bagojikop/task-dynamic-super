import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import customerData from '../../jsonData/customer.json';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Icustomer } from '../../interfaces/icustomer';
import { IItem } from '../../interfaces/i-item';
import { MatTableDataSource } from '@angular/material/table';
import ItemsJson from '../../jsonData/item.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  finalAmount: number = 0;

  displayedColumns: string[] = ['I_id', 'I_name', 'I_QtyUnit', 'Item_Qty','Item_Rate','Item_Value','Action'];
  dataSource = new MatTableDataSource<IItem>();

  customerControl = new FormControl<string | Icustomer>('');
  filteredOptions!: Observable<Icustomer[]>;
  customers: Icustomer[] = customerData;
  selectedCustomerDetails: any = null;

  constructor() {}

  ngOnInit(): void {

    this.dataSource.data = ItemsJson.map(item => ({
      ...item,
      Item_Qty: 0,  
      Item_Rate: 0,
      Item_Value: this.calculateItemValue(0, 0),
    }));


    this.filteredOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = typeof value === 'string' ? value : value?.acc_name;
        return filterValue ? this._filter(filterValue) : this.customers.slice();
      })
    );

  }

  displayFn(customer: Icustomer | null): string {
    return customer ? customer.acc_name : '';
  }

  private _filter(value: string): Icustomer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer =>
      customer.acc_name.toLowerCase().includes(filterValue)
    );
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  updateItemValue(element: any): void {
    element.Item_Value = this.calculateItemValue(element.Item_Qty, element.Item_Rate);
    this.finalAmount = this.dataSource.data.reduce((sum, current) => sum + current.Item_Value, 0);
    this.finalAmount = parseFloat(this.finalAmount.toFixed(2));
    
  }
  
  private calculateItemValue(quantity: number, rate: number): number {
    return parseFloat((quantity * rate).toFixed(2));
  }

  onOptionSelected(event: any): void {
    this.selectedCustomerDetails = event.option.value;
    console.log('Selected Customer Details:', this.selectedCustomerDetails);
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



}
