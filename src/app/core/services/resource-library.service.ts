import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, Faq, Page } from "./models";

@Injectable({
  providedIn: 'root'
})
export class ResourceLibraryService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  faqlisting(page:Page): Observable<PagedData<Faq>> {

    return this.httpClient
      .post('faq/listing', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<Faq>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];          
            let faq = new Faq(jsonObj);           
            pagedData.data.push(faq);
        }
        pagedData.page = page;
        return pagedData;
      })
  } 

  saveFaq(postedData): Observable<any> {

    return this.httpClient
      .post('faq/add', postedData)
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

    return this.httpClient.post('faq/info', Id)
        .map((response: any) => {                  
            let faq = new Faq(response);          
            return faq;
        })
  }
   
}