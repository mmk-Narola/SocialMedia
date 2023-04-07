import { Component, OnInit } from '@angular/core';
import { MediaService } from '../service/media.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayPost: any;
  totalLikes: number;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.socialPost().subscribe((res: any) => {
      this.displayPost = res.posts;
    });
  }

  likePost(id: string) {
    this.mediaService.likePost(id).subscribe((res) => {
      console.log('res :>> ', res);
    });
  }
}
