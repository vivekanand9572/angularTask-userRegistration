import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  currentUserId: number;
  bsModalRef?: BsModalRef;
  constructor(
    private api: ApiService,
    private _route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    console.log(_route.snapshot.params['id']);
    this.currentUserId = _route.snapshot.params['id'];
  }
  url =
    'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

  ngOnInit(): void {
    this.getUser(this.currentUserId);
  }

  getUser(UserId: number) {
    this.api.getUser(UserId).subscribe((res) => {
      this.user = res;
      if (!this.user.profileImage) {
        this.user.profileImage = this.url;
      }
      console.log(this.user);
    });
  }

  onEdit() {
    const initialState: ModalOptions = {
      initialState: {userForm: this.user},
    };
    this.bsModalRef = this.modalService.show(
      EditprofileComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
