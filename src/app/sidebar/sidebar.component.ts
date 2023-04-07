import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userDetails: any;
  userImg: string;
  items$ = this.userService.items$;

  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userImg = '/images/avatar.jpeg';

    this.userService.loginUserDetail().subscribe((res: any) => {
      // console.log('res :>> ', res);
      this.userDetails = res.data;
      if (this.userDetails && this.userDetails.image) {
        this.userImg = this.userDetails?.image;
      }
    });
  }
}
