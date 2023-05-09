import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { BannerComponent } from './banner/banner.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, HomePageComponent, MenubarComponent, FooterComponent, EditprofileComponent, BannerComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSliderModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
