import { Component, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//import services
import { TransactionService, AuthService, CommonUtilsService} from "../../core/services";
//import models
import { PagedData, Transaction, Page } from "../../core/services/models";

import { environment } from '../../../environments/environment'

import * as Prism from 'prismjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent {
  isLoading:boolean = false;
  
  rows = [];

  columns = [{ name: 'Company' }, { name: 'Driver' }, { name: 'Gender' },{ name: 'Device' }];

 

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/drivers.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }
 


  

  
 
}
