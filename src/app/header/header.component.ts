import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: UsersService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    // const token = this.authService.getAuhToken();
    // console.log('token :>> ', token);
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      this.toast.warning(res?.message);
      localStorage.removeItem('Token');
      localStorage.removeItem('loginUser._id');
      this.router.navigate(['login']);
    });
  }
}
