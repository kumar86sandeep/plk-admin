import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map'

//import models
import { PagedData, Car, Bid,  Page } from "./models";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient){}

  public listing(page: Page): Observable<PagedData<Car>> {

    return this.httpClient
      .post('cars/listing', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<Car>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let car = new Car(jsonObj);
            console.log('car',car)  
            pagedData.data.push(car);
        }
        pagedData.page = page;
        return pagedData;
      })

  }

  public spamCarlisting(page: Page): Observable<PagedData<Car>> {

    return this.httpClient
      .post('cars/spamCarlisting', page)
      .map((response: any) => {
        page.totalElements = response.count;
        let pagedData = new PagedData<Car>();      
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        for (let i in response.records) {
            let jsonObj = response.records[i];
          
            let car = new Car(jsonObj);
            console.log('car',car)  
            pagedData.data.push(car);
        }
        pagedData.page = page;
        return pagedData;
      })

  }
  /**
     * Fetch car details
     * @param carObject    car object to fetch from database.
     * @return        Observable<any>
    */
   public carDetail(carIdObject): Observable<any> {

    return this.httpClient.post('cars/carDetail', carIdObject)
        .map((response: any) => {  
           console.log('response',response)            
            let car = new Car(response);      
            console.log('location',car)  
            return car;
        })
  }

      /*
  * @param carId    car id to fetch data from database.
  * @return        Observable<any>
 */
  public listingCarBids(carObject): Observable<any> {
    return this.httpClient.post('cars/listingCarBids', carObject)
          .map((response: any) => {  
            return response;
          })
  }

        /*
  * @param carId    car id to fetch data from database.
  * @param status   boolean car status true/false
  * @return        Observable<any>
 */
  public spamCarStatus(data): Observable<any> {
    return this.httpClient.post('cars/spamCarStatus', data)
          .map((response: any) => {  
            return response;
          })
  }

  



  
  
}