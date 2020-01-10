import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, Invoice, } from "./models";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient){}

  public listing(page): Observable<any> {

    let postedData = {
    //  dealer_id: localStorage.getItem('loggedinUserId'),
      page:page.offset,
      limit:page.limit,
      type:page.status,
    }
    if('customer_id' in page)
      postedData['customer_id'] = page['customer_id']

    console.log('postedData',postedData);
    return this.httpClient.post('dealer/transactionListing', page).
    map((response: any) => response);

  }
 
  
  
  
}