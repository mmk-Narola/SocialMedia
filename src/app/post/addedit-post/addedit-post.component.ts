import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/service/media.service';

@Component({
  selector: 'app-addedit-post',
  templateUrl: './addedit-post.component.html',
  styleUrls: ['./addedit-post.component.scss'],
})
export class AddeditPostComponent implements OnInit {
  SocialPost: FormGroup;
  submitted = false;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SocialPost = this.fb.group({
      image: new FormControl(''),
      caption: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event: any) {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }

      this.SocialPost.patchValue({
        image: this.selectedFiles[0],
      });
    }
  }

  onSubmitPost() {
    if (this.SocialPost.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.SocialPost.get('image').value);
    formData.append('caption', this.SocialPost.get('caption').value);
    this.mediaService.addPost(formData).subscribe((res: any) => {
      console.log('res :>> ', res);
      alert(res.message);
      this.router.navigate(['/dashboard/post']);
    });
  }
}

// if (event.target.files.length > 0) {
//   const file = event.target.files[0];
//   this.SocialPost.patchValue({
//     image: file,
//   });
// }
