import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { untilDestroyed } from 'ngx-take-until-destroy';// unsubscribe from observables when the component destroyed

//services
import { AuthService, TitleService, CommonUtilsService } from '../core/services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted:boolean = false
  constructor(private commonUtilsService:CommonUtilsService, private authService:AuthService, private formBuilder: FormBuilder, private router: Router, private titleService: TitleService) {
    this._initalizeLoginForm()
   }

  ngOnInit() {
    //setting the page title
    this.titleService.setTitle();
    
  }


  private _initalizeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [null, [Validators.required]]     
    });
  }

  //check login at our local system
  onSubmit() {
    this.router.navigate(['/admin'])
   /* if (this.loginForm.invalid) {
      this.submitted = true
      return
    }
    this.authService.login(this.loginForm.value)   
      .pipe(untilDestroyed(this)) 
      .subscribe(
        (response) => {
     
          localStorage.setItem('loggedinUserAdmin', JSON.stringify(response.body))
          localStorage.setItem('loggedinUserIdAdmin', response.body.email)
          //localStorage.setItem('loggedinUser', JSON.stringify(true))
          localStorage.setItem('x-auth-token', response.headers.get('x-auth-token'))

          this.authService.isProfileUpdated(true);//trigger loggedin observable 
          this.commonUtilsService.onSuccess('Successfully Loggedin');
          this.router.navigate(['/admin'])
          

        },
        error => {         
          this.commonUtilsService.onError(error);
        });*/
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
