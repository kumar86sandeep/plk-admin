import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, Ads, Page } from "./models";

@Injectable({
  providedIn: 'root'
})
export class AdService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  adListing(page:Page): Observable<PagedData<Ads>> {

    return this.httpClient
      .post('http://54.245.128.14:3000/api/admin/advertisement/listing', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<Ads>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let car = new Ads(jsonObj);
            console.log('car',car)  
            pagedData.data.push(car);
        }
        pagedData.page = page;
        return pagedData;
      })
  } 
  
  add(postedData): Observable<any> {

    return this.httpClient
      .post('http://54.245.128.14:3000/api/admin/advertisement/add', postedData)
      .map((response: Response) => {
        return response;
      })

  }

  edit(postedData): Observable<any> {

    return this.httpClient
      .post('http://54.245.128.14:3000/api/admin/advertisement/edit', postedData)
      .map((response: Response) => {
        return response;
      })

  }

  /**
     * Fetch car details
     * @param carObject    car object to fetch from database.
     * @return        Observable<any>
    */
   public info(Id): Observable<any> {

    return this.httpClient.post('http://54.245.128.14:3000/api/admin/advertisement/info', Id)
        .map((response: any) => {  
           console.log('response',response)            
            let ads = new Ads(response);      
           // console.log('location',ads)  
            return ads;
        })
  }
   
}