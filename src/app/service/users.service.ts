import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ProfileUser,
  allUser,
  login,
  password,
  signUp,
  singleUser,
} from '../model/data-type';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.apiRoot;
  // public _imageSubject$ = new BehaviorSubject(null);
  private items = new BehaviorSubject(null);
  public items$ = this.items.asObservable();

  // public profileImage = this._imageSubject.asObservable();

  constructor(private http: HttpClient) {}

  userRegister(userDetails: signUp) {
    return this.http.post(this.apiUrl + '/signup', userDetails);
  }

  userLogin(userLogin: login) {
    return this.http.post(this.apiUrl + '/login', userLogin);
  }

  isLoggedIn() {
    return localStorage.getItem('Token') != null;
  }

  profileImgUpdate(formdata: FormData) {
    return this.http.patch(this.apiUrl + '/user', formdata);
  }

  public getAuhToken(): string {
    return localStorage.getItem('Token') || '';
  }

  loginUserDetail(): Observable<singleUser | null> {
    return this.http.get(this.apiUrl + '/user').pipe(
      tap((userData) => {
        this.items.next(userData);
      })
    );
  }

  resetPassword(email: string) {
    return this.http.post(this.apiUrl + '/forgotpassword', email);
  }

  newPassword(token: string, data: password) {
    return this.http.patch(this.apiUrl + `/resetpassword/${token}`, data);
  }

  logout() {
    return this.http.post(this.apiUrl + '/logout', null);
  }

  getallUser(userSearch?: string): Observable<any> {
    if (userSearch) {
      return this.http.get(this.apiUrl + `/getallUser?search=${userSearch}`);
    } else {
      const lastMsg = true;
      return this.http.get(this.apiUrl + `/getallUser?lastMessage=${lastMsg}`);
    }
  }
}
