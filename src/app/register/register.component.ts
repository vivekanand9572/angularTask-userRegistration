import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../shared/api.service';
import { RegisterData } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  userForm: RegisterData = new RegisterData();
  registrationForm!: FormGroup;
  value: number = 20;
  options: Options = {
    floor: 20,
    ceil: 60,
  };
  url =
    'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    public bsModalRef: BsModalRef,
    private _router: Router) { }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      profileImage: [''],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,19}$')]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      p_number: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      age: [''],
      state: ['State'],
      country: ['Country'],
      addressType: ['home'],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      interests: [''],
      newsletter: ['', [Validators.required]],
      imageSource: ['', [Validators.required]],
    });
  }

  // onFileSelected(event: any) {
  //   let fileType = event.target.files[0].type;
  //   if (fileType.match(/image\/*/)) {
  //     let reader = new FileReader();
  //     const file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //       this.registrationForm.patchValue({
  //         imageSource: event.target.result,
  //       });
  //     };
  //   } else {
  //     window.alert('Please select correct image format');
  //   }
  // }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size / 1024 / 1024; // in MB
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event: any) => {
      img.src = event.target.result;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (!fileType.match(/image\/.*/)) {
          window.alert('Please select an image file.');
        } else if (fileSize > 5) {
          window.alert('Please select an image file smaller than 5MB.');
        } else if (width > 310 || height > 325) {
          window.alert('Please select an image with dimensions of at least 325 x 250.');
        } else {
          // Do something with the valid image file
          this.url = event.target.result;
          this.registrationForm.patchValue({
            imageSource: event.target.result,
          });
        }
      };
    };
  }


  onChange(deviceValue: any) {
    console.log(deviceValue);
  }

  addRegister() {
    this.userForm.profileImage = this.registrationForm.value.imageSource;
    this.userForm.firstName = this.registrationForm.value.firstName;
    this.userForm.lastName = this.registrationForm.value.lastName;
    this.userForm.email = this.registrationForm.value.email;
    this.userForm.p_number = this.registrationForm.value.p_number;
    this.userForm.age = this.registrationForm.value.age;
    this.userForm.state = this.registrationForm.value.state;
    this.userForm.country = this.registrationForm.value.country;
    this.userForm.addressType = this.registrationForm.value.addressType;
    this.userForm.address1 = this.registrationForm.value.address1;
    this.userForm.address2 = this.registrationForm.value.address2;
    this.userForm.companyAddress1 = this.registrationForm.value.companyAddress1;
    this.userForm.companyAddress2 = this.registrationForm.value.companyAddress2;
    if (this.registrationForm.value.interests) {
      this.userForm.interests = this.registrationForm.value.interests?.map((a: any) => a.value);
    }
    this.userForm.newsletter = this.registrationForm.value.newsletter;
    console.log(this.userForm);
    this.api.register(this.userForm).subscribe(
      res => {
        console.log(res);
        alert('Registered Successfully');
        this.bsModalRef.hide();
        this._router.navigate(['/user-profile/' + res['id']]);
      },
      err => {
        alert('Something went wrong');
      }
    );
  }
}
