import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiUrl = environment.apiRoot;
  private socket: Socket;
  public latestMessage$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.socket = io('192.168.1.241:8000');
  }

  // socket = io('192.168.1.241:8000');

  // this.socket.emit('sendMessage', { message: msg });

  sendMessage(receiverid: string, message: string) {
    const senderid = JSON.parse(localStorage.getItem('loginUser._id'));
    const roomId = [senderid, receiverid];
    const room = roomId.join('_');
    const Obj = {
      senderid: senderid,
      receiverid: receiverid,
      message: message,
    };
    // const roomId = [senderid, receiverid];
    // const room = roomId.join('_');
    // this.socket.emit('joinChat', (room: any) => {
    //   console.log('room :>> ', room);
    // });
    return this.http.post(this.apiUrl + '/message/addmsg', Obj).pipe(tap());
  }

  getMessage(receiverid: string) {
    const loginUserId = JSON.parse(localStorage.getItem('loginUser._id'));
    const Obj = {
      senderid: loginUserId,
      receiverid: receiverid,
    };
    this.socket.on('sendMessage', (message: any) => {});
    return this.http.post(this.apiUrl + '/message/getmsg', Obj);
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `,
  //       error.error
  //     );
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     () => new Error('Something bad happened; please try again later.')
  //   );
  // }
}
