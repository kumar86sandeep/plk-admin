import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { ToastrManager } from 'ng6-toastr-notifications';//toaster class

//import shared services
import { environment } from '../../../environments/environment'

import Swal from 'sweetalert2'

//import models
import { PagedData, Payment, Page ,Dispute} from "./models";

@Injectable()
export class CommonUtilsService { 

  constructor(private httpClient: HttpClient, private toastrManager:ToastrManager ) { }


  
  /**
  * Show alert on success response & hide page loader
  * @return void
  */
  public onSuccess(message): void {
   // this.pageLoaderService.pageLoader(false);//hide page loader
    //this.pageLoaderService.setLoaderText('');//setting loader text empty
    this.toastrManager.successToastr(message, 'Success!'); //showing success toaster 
  }

  /**
  * Show alert on error response & hide page loader
  * @return void
  */
  public onError(message): void {
   // this.pageLoaderService.setLoaderText(environment.MESSAGES.ERROR_TEXT_LOADER);//setting loader text
    //this.pageLoaderService.pageLoader(false);//hide page loader
    this.toastrManager.errorToastr(message, 'Oops!',{maxShown:1});//showing error toaster message  
  }

  /**
   * Fetch city, state information of zipcode
   * @param zipcode    Vehicle zipcode.
   * @return        Observable<any>
*/
 public fetchCityStateOfZipcode(zipcode): Observable<any> {  
    
  let url = `${environment.ADDRESS_API.ENDPOINT}/lookup?auth-id=${environment.ADDRESS_API.KEY}&auth-token=${environment.ADDRESS_API.TOKEN}&zipcode=${zipcode}`;

  return this.httpClient.get(url)
      .map((response: any) => {         
          return response;
      })
}

/**
 * 
 * @param email user email for signup
 * @return username
 */

public getUsername(email: string): string {
  //username = email?String(_.dropRight((email).split('@'))):''; 
  let username = email.substring(0, email.lastIndexOf("."))
  return String(username.replace("@", "_"));
}

/**
  * To check the image validity for type jpeg, png, jpg
  * @return boolean
  * @param base64string image base64 string 
  * @param type image type (jpeg, png, jpg)
  */
 public isFileCorrupted(base64string, type): boolean {

  if (type == 'png') {
    console.log('get filetype', type)
    const imageData = Array.from(atob(base64string.replace('data:image/png;base64,', '')), c => c.charCodeAt(0))
    const sequence = [0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]; // in hex: 

    //check last 12 elements of array so they contains needed values
    for (let i = 12; i > 0; i--) {
      if (imageData[imageData.length - i] !== sequence[12 - i]) {
        return false;
      }
    }

    return true;
  }
  else if(type=='pdf'){ 
    return true;
  }
  else if (type == 'jpeg' || type == 'jpg') {
    const imageDataJpeg = Array.from(atob(base64string.replace('data:image/jpeg;base64,', '')), c => c.charCodeAt(0))
    const imageCorrupted = ((imageDataJpeg[imageDataJpeg.length - 1] === 217) && (imageDataJpeg[imageDataJpeg.length - 2] === 255))
    return imageCorrupted;
  }
}


paymentsListing(page:Page): Observable<PagedData<Payment>> {

  return this.httpClient
    .post('auth/listingPayments', page)
    .map((response: any) => {
      page.totalElements = response.count;
      let pagedData = new PagedData<Payment>();      
      page.totalPages = page.totalElements / page.size;
      let start = page.pageNumber * page.size;
      for (let i in response.records) {
          let jsonObj = response.records[i];
        
          let payment = new Payment(jsonObj);
          console.log('payment',payment)  
          pagedData.data.push(payment);
      }
      pagedData.page = page;
      return pagedData;
    })
}


      /*
  * @param 
  * @return        Observable<any>
 */
public listingDisputes(page): Observable<any> {
  return this.httpClient.post('cars/disputesListing', page)
  .map((response: any) => {
    page.totalElements = response.count;
    let pagedData = new PagedData<Dispute>();      
    page.totalPages = page.totalElements / page.size;
    let start = page.pageNumber * page.size;
    for (let i in response.records) {
        let jsonObj = response.records[i];
      
        let dispute = new Dispute(jsonObj);
        console.log('',dispute)  
        pagedData.data.push(dispute);
    }
    pagedData.page = page;
    return pagedData;
  })
}

}