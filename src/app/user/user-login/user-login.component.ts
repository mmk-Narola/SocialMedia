import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login, signUp } from 'src/app/model/data-type';

import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  hide = true;
  submitted = false;
  userLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.userLogin.controls;
  }

  onLogin() {
    this.submitted = true;
    if (this.userLogin.invalid) {
      return;
    }
    const useLoginDetails: login = this.userLogin.value;

    this.userService.userLogin(useLoginDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('Token', JSON.stringify(res.token));
        localStorage.setItem('loginUser._id', JSON.stringify(res.data._id));
        // alert(res?.status + 'fully' + ' Login');
        this.toastr.success(res?.status + 'fully' + ' Login');
        this.userLogin.reset();
      },
      error: (error: any) => {
        // alert(error.error.message);
        this.toastr.error(error.error.message);
      },
      complete: () => {
        this.route.navigate(['dashboard/post']);
      },
    });
  }
}
