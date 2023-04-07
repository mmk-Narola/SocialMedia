import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  constructor(private authService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe({
      next(res: any) {
        alert(res.message);
        localStorage.removeItem('Token');
        this.router.navigate(['login']);
      },
      error(error) {
        alert(error.error.message);
      },
      complete() {
        this.router.navigate(['login']);
      },
    });
  }
}
// // (res: any) => {
//       alert(res.message);
//       localStorage.removeItem('Token');
//       this.router.navigate(['login']);
//     }
