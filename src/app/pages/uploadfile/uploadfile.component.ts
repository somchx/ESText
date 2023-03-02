import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService, Result } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader!: ElementRef;

  status: string = '';
  result?: Result;
  isUpload: boolean = false;
  isCompute: boolean = false;
  isVideo: boolean = false;
  isChoosed: boolean = false;
  isSpinner: boolean = false;
  file: any;
  attachedFile: any;
  videoResult: any;
  format: string | undefined;
  url: string | ArrayBuffer | null | undefined;
  error: any;
  durationText: any;
  minutes : any;
  seconds : any;
  value2 : any;
  value1 : any;
  constructor(private api: ApiService, private messageService: MessageService) { }

  
  ngOnInit() {
  }

  again(): void {
    this.api.getAgain().subscribe(response => {
      console.log(response)
    });
  }
  chooseFile(event: any) {
    this.isSpinner = false;
    this.isChoosed = true;
    this.isUpload = false;
    this.file = event.target.files && event.target.files[0];
    console.log(this.file)
    const audio = new Audio();
    audio.src = URL.createObjectURL(event.target.files[0]);
    audio.onloadedmetadata = () => {
      if (audio.duration > 300){
        this.messageService.add({
          key: 'tr', severity: 'warn',
          summary: 'Warning', detail: "This file duration exceeds maximum limit. Maximum allowed file duration is 5 minutes."
        });
      }
      this.durationText = audio.duration;
      
      if(Math.floor(this.durationText / 60) >0){
        this.minutes = '0'+Math.floor(this.durationText / 60); 
        this.seconds = (this.durationText - this.minutes * 60).toFixed(0) +' minutes';
      }
      else{
        this.minutes = Math.floor(this.durationText / 60);
        this.seconds = (this.durationText - this.minutes * 60).toFixed(0) +' seconds';
      }
      
      console.log(this.durationText);
      console.log(this.minutes);
      
    };
    
    if (this.file) {
      
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('audio') > -1) {
        this.isVideo = false;
      } else if (this.file.type.indexOf('video') > -1) {
        this.isVideo = true;
      } else {
        this.messageService.add({
          key: 'tr', severity: 'error',
          summary: 'Error', detail: "This file format is not supported."
        });
        this.isChoosed = false;
        this.resetFileUploader()
      }

      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
    if (this.file.size <= 1000000) {
      this.status = 'File chosen : ' + 
      this.file.name + '   ' + 
      (this.file.size / 1000).toFixed(2) + ' KB'
    }
    else if (this.file.size == 1000000 || this.file.size <= 1000000000) {
      this.status = 'File chosen : ' + this.file.name + '   ' + (this.file.size / 1000000).toFixed(2) + ' MB';
    }
    else if (this.file.size == 1000000000 || this.file.size <= 1000000000000) {
      this.status = 'File chosen : ' + this.file.name + '   ' + (this.file.size / 1000000000).toFixed(2) + ' GB';
    }
    if (this.file.type == 'video/mp4') {
      this.isVideo = true;
    }
  }
  upload() {
    this.isSpinner = true;
    this.api.upload(this.file).subscribe(response => {
      console.log(response)
      this.messageService.add({
        key: 'tr', severity: 'success',
        summary: 'The file is uploaded', detail: this.file.name + " is uploaded."
      });
      this.isUpload = true;
      this.isChoosed = false;
      this.resetFileUploader()
      this.isSpinner = false;
    }, (err) => {
      this.isSpinner = false;
      this.messageService.add({
        key: 'tr', severity: 'error',
        summary: 'Error', detail: "No response received from the server."
      });
    })
  }
  getProcess() {
    this.isCompute = true;
    this.isUpload = false;
    this.api.getProcess().subscribe(response => {
      this.result = response
      console.log(response)
      if (this.result != null) {
        this.isCompute = false;
      }
    })
  }
  resetFileUploader() {
    this.fileUploader.nativeElement.value = null;
    this.isChoosed = false;
  }
  video() {
    this.api.getVideo().subscribe(response => {
      console.log(response)
      const video = document.getElementById("vdo") as HTMLVideoElement
      video.src = window.URL.createObjectURL(response)
    })
  }
}
