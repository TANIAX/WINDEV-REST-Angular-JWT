import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material-module';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { AngularDefautPageComponent } from './component/angular-defaut-page/angular-defaut-page.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './Services/auth-interceptor';
import { AuthGuard } from './Services/auth-guard.service';
import { ClientEditComponent } from './component/client-edit/client-edit.component';
import { Error404Component } from './component/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AngularDefautPageComponent,
    ClientListComponent,
    LoginComponent,
    ClientEditComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
