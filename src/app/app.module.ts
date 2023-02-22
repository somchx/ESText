import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile.component';
import { AboutComponent } from './pages/about/about.component';

import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule} from 'primeng/divider';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule} from 'primeng/scrollpanel';

import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './pages/result/result.component';

import { AudioRecordingService } from "./services/audio-recording.service";
import { AudioRecordingComponent } from './audio-recording/audio-recording.component';
import { SafePipe } from './pages/uploadfile/safePipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DefaultLayoutComponent,
        NavbarComponent,
        UploadfileComponent,
        AboutComponent,
        ResultComponent,
        AudioRecordingComponent,SafePipe
    ],
    providers: [
        MessageService,
        AudioRecordingService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        FileUploadModule,
        HttpClientModule,
        DialogModule,
        MessagesModule,
        MessageModule,
        ReactiveFormsModule,
        ProgressBarModule,
        ToastModule,
        ProgressSpinnerModule,
        BlockUIModule,
        CardModule,
        DividerModule,
        ScrollPanelModule
        
    ]
})
export class AppModule { }
