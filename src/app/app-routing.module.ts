import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminAuthGuardService } from './core/guards/admin-auth-guard.service'

import { DriversComponent } from './home/drivers/drivers.component';
const routes: Routes = [
  {
  path: 'admin',
  data: {
      title: 'Get Started',
  },  
  children: [
    {
      path: '',
      component: DriversComponent,
      data: {
        customLayout: false,
        title: 'Car Listing',
      }
    }, 
    {
      path: 'drivers',
      component: DriversComponent,
      data: {
        customLayout: false
      }
    }    
  ]
  },  
  {
    path: '',
    loadChildren: './+login/login.module#LoginModule',
    data: {
      customLayout: true,
      title: 'Admin Control Access Panel',
    }
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule',
    data: {
      customLayout: true,
      title: 'Forgot Password',
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
