import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { AboutComponent } from './about/about.component';

import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultLayoutComponent,
    NavbarComponent,
    UploadfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
