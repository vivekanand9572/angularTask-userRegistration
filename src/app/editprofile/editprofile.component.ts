import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterData } from '../register/register.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  userForm: RegisterData   = new RegisterData();
  registrationForm!: FormGroup;
  profilePic!: string;
  value: number = 20;
  options: Options = {
    floor: 20,
    ceil: 60,
  };
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    public bsModalRef: BsModalRef,
    private _router: Router
  ) {}
  ngOnInit(): void {
   this.profilePic = this.userForm.profileImage;
   this.registrationForm = this.formBuilder.group({
    profileImage: [this.userForm.profileImage || ''],
    firstName: [this.userForm.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]{1,19}$')]],
      lastName: [this.userForm.lastName || ''],
      // email: [this.userForm.email || ''],
      email: [this.userForm.email ,[Validators.required, Validators.pattern('^[a-zA-Z]{1,19}$')]],
      p_number: [this.userForm.p_number || ''],
      age: [this.userForm.age || ''],
      state: [this.userForm.state || 'State'],
      country: [this.userForm.country || 'Country'],
      addressType: [this.userForm.addressType || 'home'],
      address1: [this.userForm.address1 || ''],
      address2: [this.userForm.address2 || ''],
      companyAddress1: [this.userForm.companyAddress1 || ''],
      companyAddress2: [this.userForm.companyAddress2 || ''],
      interests: [this.userForm.interests || ''],
      newsletter: [this.userForm.newsletter || ''],
      imageSource: [this.userForm.profileImage || ''],
   });
   if(this.userForm.interests){
    const x = this.registrationForm.value.interests?.map((item:any) => ({value : item, display:item}));

    this.registrationForm.patchValue({interests:x});
   }
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
      this.userForm.interests = this.registrationForm.value.interests?.map(
        (a: any) => a.value
      );
    }
    this.userForm.newsletter = this.registrationForm.value.newsletter;
    console.log(this.userForm);
    this.api.updateUser(this.userForm, this.userForm.id).subscribe(
      (res) => {
        console.log(res);
        alert('User Updated Successfully');
        this._router.navigate(['/user-profile/' + res['id']]);
        this.bsModalRef.hide();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  onFileSelected(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.profilePic = event.target.result;
        this.registrationForm.patchValue({
          imageSource: event.target.result,
        });
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  onChange(deviceValue: any) {
    console.log(deviceValue);
  }

}
