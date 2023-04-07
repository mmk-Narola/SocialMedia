import { Component, OnInit, VERSION, Version } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt, filter } from 'rxjs';
import { MediaService } from 'src/app/service/media.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.scss'],
})
export class DisplayPostComponent implements OnInit {
  ver = VERSION;
  displayColums: string[] = [
    'id',
    'caption',
    'image',
    'create-date',
    'creator-by',
    'action',
  ];
  socialPost: any;
  loginUser: any;

  constructor(
    private mediaService: MediaService,
    private userServices: UsersService
  ) {}

  dataSource: any = new MatTableDataSource();

  ngOnInit(): void {
    this.userServices.loginUserDetail().subscribe((res: any) => {
      this.loginUser = res.data;
    });
    this.getPost();
  }

  getPost() {
    this.mediaService.socialPost().subscribe((res: any) => {
      this.socialPost = res.posts.filter((elementAt: any) => {
        return elementAt.creator?.name === this.loginUser?.name;
      });
    });
  }

  deletePost(id: string) {
    this.mediaService.deletePost(id).subscribe((res: any) => {
      alert(res.message);
      this.getPost();
      this.socialPost = '';
    });
  }
}

// res.posts.forEach((element: { creator: { name: any } }) => {
//   if (element.creator.name === this.loginUser.name) {
//     this.socialPost = element;
//   }
// });
// console.log('res :>> ', this.socialPost);
// this.socialPost = res.posts;
