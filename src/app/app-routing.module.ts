import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './setting/profile/profile.component';
import { DisplayPostComponent } from './post/display-post/display-post.component';
import { AddeditPostComponent } from './post/addedit-post/addedit-post.component';
import { ForgetpasswordComponent } from './setting/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './setting/resetpassword/resetpassword.component';
import { ChatdashboardComponent } from './chat/chatdashboard/chatdashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: HeaderComponent,
    children: [
      {
        path: 'create-post',
        component: AddeditPostComponent,
      },
      {
        path: 'post',
        component: DisplayPostComponent,
      },
      {
        path: 'friends',
        component: ChatdashboardComponent,
      },
      {
        path: 'setting',
        component: ProfileComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: UserSignupComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
