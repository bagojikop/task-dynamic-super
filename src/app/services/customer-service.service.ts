import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor( private http: HttpClient) { }

  getCustomerByAcc_code(acc_code:any){
    return this.http.get('http://localhost:3000/customer?acc_code='+acc_code)
  }

  getCustomer(){
    return this.http.get('http://localhost:3000/customer')
  }

}
