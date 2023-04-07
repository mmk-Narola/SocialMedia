import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ProfileUser, allUser, singleUser } from 'src/app/model/data-type';
import { ChatService } from 'src/app/service/chat.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-chatdashboard',
  templateUrl: './chatdashboard.component.html',
  styleUrls: ['./chatdashboard.component.scss'],
})
export class ChatdashboardComponent implements OnInit {
  searchControl = new FormControl('');
  message = new FormControl('');
  user$: ProfileUser;
  allUsers: ProfileUser[];
  newList: any;
  userImg: string;
  selectedUser: any;
  allMsg: any[];
  // messageList: string[] = [];

  constructor(
    private userServices: UsersService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getMessage(null).subscribe((message: string) => {
      // this.messageList.push(message);
    });

    this.userServices.loginUserDetail().subscribe((res: singleUser) => {
      this.user$ = res.data;
      this.userServices.getallUser(null).subscribe((res: any) => {
        this.allUsers = res.data.filter(
          (ele: ProfileUser) => ele._id !== this.user$._id
        );
      });
    });

    this.userImg = '/images/avatar.jpeg';
  }

  onChangeEvent(event: any) {
    const string = event.target.value;
    this.userServices.loginUserDetail().subscribe((res: singleUser) => {
      this.user$ = res.data;
      this.userServices.getallUser(string).subscribe((res: any) => {
        this.allUsers = res.data.filter(
          (ele: ProfileUser) => ele._id !== this.user$._id
        );
      });
    });
  }

  selectUser(user_id: string) {
    this.allUsers.forEach((element) => {
      if (element._id == user_id) {
        this.selectedUser = element;
        this.chatService
          .getMessage(this.selectedUser._id)
          .subscribe((res: any) => {
            this.allMsg = res;
            // console.log('res :>> ', res);
          });
      }
    });
  }

  sendMessage() {
    const msg = this.message.value;
    this.allMsg.push(msg);
    console.log('All', this.allMsg);
    const receiverId = this.selectedUser._id;
    this.chatService.sendMessage(receiverId, msg).subscribe((res) => {
      console.log('res :>> ', res);
    });
    this.message.reset();
  }
}

// res.forEach((ele: { fromSelf: boolean; message: any }) => {
//   if (ele.fromSelf === true) {
//     this.senderMsg.push(ele);
//     console.log('Message True :>> ', this.senderMsg);
//   } else {
//     this.reviewerMsg.push(ele.message);
//     console.log('Message False :>> ', this.reviewerMsg);
//   }
// });
