import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileDetails: any;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string[] = [];
  profileImage: FormGroup;

  constructor(private userService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.loginUserDetail().subscribe((res: any) => {
      // console.log('res :>> ', res.data);
      this.profileDetails = res.data;
    });

    this.profileImage = this.fb.group({
      image: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event: any) {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    // this.userService._imageSubject$.next(this.selectedFiles);
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }

      this.profileImage.patchValue({
        image: this.selectedFiles[0],
      });
    }
  }

  UpdateImage() {
    if (this.profileImage.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.profileImage.get('image').value);
    this.userService.profileImgUpdate(formData).subscribe((res: any) => {
      // console.log('res :>> ', res);
      alert('Update');
    });
  }
}
