import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  submitted = false;
  forgetpassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.forgetpassword = this.fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.forgetpassword.controls;
  }

  onReset() {
    this.submitted = true;
    if (this.forgetpassword.invalid) {
      return;
    }
    console.log(this.forgetpassword.value);
    // this.route.navigate(['/resetpassword']);
    this.userService
      .resetPassword(this.forgetpassword.value)
      .subscribe((res: any) => {
        console.log(res);
        alert(res.status);
        this.route.navigate(['/resetpassword']);
      });
  }
}
