import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile.component';
import { AboutComponent } from './pages/about/about.component';
import { ResultComponent } from './pages/result/result.component';
import { AudioRecordingComponent } from './audio-recording/audio-recording.component';
const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'FileUpload', component: UploadfileComponent },
      { path: 'AboutUs', component: AboutComponent },
      { path: 'Result',component: ResultComponent},
      { path: 'Record',component: AudioRecordingComponent}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
