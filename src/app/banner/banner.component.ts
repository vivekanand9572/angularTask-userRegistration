import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  bsModalRef?: BsModalRef;
constructor(private modalService: BsModalService ){}
  onRegister() {
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(RegisterComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
