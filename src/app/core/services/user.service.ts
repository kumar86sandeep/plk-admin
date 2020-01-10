import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, User, Page } from "./models";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  sellerListing(page:Page): Observable<PagedData<User>> {

    return this.httpClient
      .post('seller/listingSeller', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<User>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let car = new User(jsonObj);
            console.log('car',car)  
            pagedData.data.push(car);
        }
        pagedData.page = page;
        return pagedData;
      })
  }

  sellerEmailExist(postedData): Observable<any> {

    return this.httpClient
      .post('seller/emailExist', postedData)
      .map((response: Response) => {
        return response;
      })
  }
  sellerPhoneNumberExist(postedData): Observable<any> {

    return this.httpClient
      .post('seller/phoneNumberExist', postedData)
      .map((response: Response) => {
        return response;
      })
  }

  sellerSignup(postedData): Observable<any> {

    return this.httpClient
      .post('seller/signup', postedData)
      .map((response: Response) => {
        return response;
      })

  }







  dealerListing(page:Page): Observable<PagedData<User>> {

    return this.httpClient
      .post('dealer/listingDealer', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<User>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let user = new User(jsonObj);       
            pagedData.data.push(user);
        }
        pagedData.page = page;
        return pagedData;
      })
  }

  dealerEmailExist(postedData): Observable<any> {

    return this.httpClient
      .post('dealer/emailExist', postedData)
      .map((response: Response) => {
        return response;
      })
  }

  dealerApproved(postedData): Observable<any> {

    return this.httpClient
      .post('dealer/verifyDealer', postedData)
      .map((response: Response) => {
        return response;
      })
  }
  sellerApproved(postedData): Observable<any> {

    return this.httpClient
      .post('seller/verifySeller', postedData)
      .map((response: Response) => {
        return response;
      })
  }
  
  dealerPhoneNumberExist(postedData): Observable<any> {

    return this.httpClient
      .post('dealer/phoneNumberExist', postedData)
      .map((response: Response) => {
        return response;
      })
  }

  dealerSignup(postedData): Observable<any> {

    return this.httpClient
      .post('dealer/signup', postedData)
      .map((response: Response) => {
        return response;
      })

  }
  
   
}