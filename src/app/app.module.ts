import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { adminLteConf } from './admin-lte.conf';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

//imports components
import { AppComponent } from './app.component';
import { DriversComponent } from './home/drivers/drivers.component';

//importing services
import { CommonUtilsService } from './core/services'

//importing intercepters
import { ApiIntercepter } from './core/intercepters/api.intercepter';
import { TokenInterceptor } from './core/intercepters/token.interceptor';
import { HttpErrorInterceptor } from './core/intercepters/http-error.interceptor';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, 
    MaterialBarModule,
    NgxDatatableModule,
    DropzoneModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,   
    DriversComponent,
   
  ],
  providers: [ 
    CommonUtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntercepter, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
