import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './home/home.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'UploadFile', component: UploadfileComponent },
      { path: 'AboutUs', component: AboutComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
