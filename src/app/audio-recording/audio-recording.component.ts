import { Component, OnDestroy, OnInit } from "@angular/core";
import { AudioRecordingService } from "../services/audio-recording.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiService } from "../services/api.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-audio-recording',
  templateUrl: './audio-recording.component.html',
  styleUrls: ['./audio-recording.component.css']
})
export class AudioRecordingComponent implements OnInit {
  isShow = false;
  isRecording = false;
  isUpload : boolean = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  isSpinner: boolean = false;

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private api: ApiService,
    private messageService: MessageService
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  startRecording() {
    this.blobUrl = null;
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  stopRecording() {
    this.isShow = true;
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }
  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }


  clearRecordedData() {
    this.isShow = false;
    this.isUpload = false;
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }
  async upload(){
    this.isSpinner = true;
    let file = new File([this.teste.blob],'audio.mp3',{type : 'audio/mp3'})
    console.log(file.name,file.size,file.type)
    this.api.upload(file).subscribe(response => {
      console.log(response)
      this.isUpload =true ;
      this.isSpinner = false;
      this.messageService.add({ key: 'tr', severity: 'success', 
      summary: 'The file is uploaded', detail: "Audio record file is uploaded" });
    }, (err) => {
      this.isSpinner = false;
      this.messageService.add({
        key: 'tr', severity: 'error',
        summary: 'Error', detail: "No response received from the server."
      });
    }
    )
  }


  
  getProcess(){
    this.api.getProcess().subscribe(response => {
      console.log(response)
    })
  }


}
