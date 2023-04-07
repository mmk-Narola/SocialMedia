import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  apiUrl = environment.apiRoot;

  constructor(private http: HttpClient) {}

  socialPost() {
    return this.http
      .get(this.apiUrl + '/post')
      .pipe(catchError(this.handleError));
  }

  addPost(data: FormData) {
    return this.http
      .post(this.apiUrl + '/post', data)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: string) {
    return this.http
      .delete(this.apiUrl + `/delete/post/${id}`)
      .pipe(catchError(this.handleError));
  }

  likePost(postId: string) {
    return this.http
      .put(this.apiUrl + `/like/${postId}`, null)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   Authorization: `bearer ${this.userToken}`,
// });
// const requestOptions = { headers: headers };
