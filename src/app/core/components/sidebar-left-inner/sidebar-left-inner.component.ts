import { Component, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

//import services
import { AuthService } from '../../services'
import { environment } from '../../../../environments/environment'
@Component({
  selector: 'app-sidebar-left-inner',
  templateUrl: './sidebar-left-inner.component.html'
})
export class SidebarLeftInnerComponent {
  profileSubscription: Subscription;
  profileData: any = {};
  constructor( private router: Router, private authService:AuthService, private ngZone: NgZone){
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
}
