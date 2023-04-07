import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { signUp } from 'src/app/model/data-type';
import { GlobalConstants } from 'src/app/model/data-type';
import { UsersService } from 'src/app/service/users.service';
import { ConfirmedValidator } from 'src/app/shared/confirmed.validator';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  hide = true;
  submitted = false;
  userRegister: FormGroup;
  addProuctMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userRegister = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(GlobalConstants.password),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.userRegister.controls;
  }

  onRegister() {
    this.submitted = true;
    if (this.userRegister.invalid) {
      return;
    }

    const userDetails: signUp = this.userRegister.value;
    console.log('userDetails :>> ', userDetails);
    this.userService.userRegister(userDetails).subscribe({
      next(res: any) {
        alert(res?.message);
        this.userRegister.reset();
      },
      error(error) {
        console.error('error :>> ', error?.error?.message);
      },
      complete: () => {
        this.route.navigate(['dashboard']);
      },
    });
  }
}

// let r = (this.addProuctMessage = 'All Field Required');
// setTimeout(() => {
//   this.addProuctMessage = undefined;
// }, 2000);
