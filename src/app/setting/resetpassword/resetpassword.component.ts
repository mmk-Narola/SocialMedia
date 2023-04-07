import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/model/data-type';
import { UsersService } from 'src/app/service/users.service';
import { ConfirmedValidator } from 'src/app/shared/confirmed.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  resetPassword: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.resetPassword.controls;
  }

  onReserPassword() {
    this.submitted = true;
    if (this.resetPassword.invalid) {
      return;
    }
    // console.log(this.resetPassword.value);
    const token =
      '3487e1449494319376a5164c0228dc483cff3e222e131f6e766c3bc1d80fe33b';
    this.userService
      .newPassword(token, this.resetPassword.value)
      .subscribe((res: any) => {
        console.log(res);
        alert(res.message);
        this.route.navigate(['login']);
      });
  }
}
