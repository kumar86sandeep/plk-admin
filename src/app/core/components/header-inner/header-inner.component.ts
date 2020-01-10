import { Component, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';//toaster class
import { Subscription } from 'rxjs/Subscription';

//import services
import { AuthService } from '../../services'
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent {
  
  profileSubscription: Subscription;
  profileData: any = {};
  constructor(private toastrManager:ToastrManager, private router: Router, private authService:AuthService, private ngZone: NgZone){
    this.ngZone.run( () => {
      if(JSON.parse(localStorage.getItem('loggedinUserAdmin'))){
        this.profileData = JSON.parse(localStorage.getItem('loggedinUserAdmin'));
        const defaultPath = environment.WEB_ENDPOINT + '/' + environment.DEFAULT_PROFILE
        this.profileData.profile_pic = (this.profileData.profile_pic) ? this.profileData.profile_pic : defaultPath;
        console.log('profile',this.profileData);
      }
      

    });
    
    this.profileSubscription = this.authService.getUpdatedProfileStatus().subscribe((profileStatus) => {
     
      
      this.ngZone.run( () => {
        this.profileData = JSON.parse(localStorage.getItem('loggedinUserAdmin'));
        const defaultPath = environment.WEB_ENDPOINT + '/' + environment.DEFAULT_PROFILE
        this.profileData.profile_pic = (this.profileData.profile_pic) ? this.profileData.profile_pic : defaultPath;
        console.log('profile',this.profileData);

      }); 
      
    });
  }
  profile(){
    this.router.navigate(['/admin/profile']); 
  }

  logout(){
   
    this.toastrManager.successToastr(environment.MESSAGES.LOGOUT_SUCCESS, 'Success!');//showing success toaster
    localStorage.removeItem('loggedinUserAdmin');
    localStorage.clear();
    this.authService.isLoggedIn(false, '');
    this.router.navigate(['/']);   
  }
}
