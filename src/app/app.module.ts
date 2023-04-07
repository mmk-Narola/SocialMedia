import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { HomeComponent } from './home/home.component';
import { HttpInterceptorInterceptor } from './core/http-interceptor.interceptor';
import { ProfileComponent } from './setting/profile/profile.component';
import { AddeditPostComponent } from './post/addedit-post/addedit-post.component';
import { DisplayPostComponent } from './post/display-post/display-post.component';
import { ForgetpasswordComponent } from './setting/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './setting/resetpassword/resetpassword.component';
import { ChatdashboardComponent } from './chat/chatdashboard/chatdashboard.component';
import { ChatService } from './service/chat.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    UserSignupComponent,
    UserLoginComponent,
    CommonHeaderComponent,
    HomeComponent,
    ProfileComponent,
    AddeditPostComponent,
    DisplayPostComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ChatdashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    ChatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
