import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, Document, Page } from "./models";

@Injectable({
  providedIn: 'root'
})
export class DocService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  listing(page:Page): Observable<PagedData<Document>> {

    return this.httpClient
      .post('document/listing', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<Document>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let document = new Document(jsonObj);
            console.log('car',document)  
            pagedData.data.push(document);
        }
        pagedData.page = page;
        return pagedData;
      })
  } 
  
   
}