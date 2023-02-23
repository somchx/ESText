import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService, Result } from '../../services/api.service';
import { DownloadService } from 'src/app/services/download.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result!: Result;
  blockedDocument: boolean = false;
  isCopy: boolean = false;
  message: string = 'Copy'
  isError : boolean = false;
  errorMsg : string = ''
  noResult : boolean= false;
  noEnvi : boolean= false;
  filename : string = ''
  isStart = false;
  res: Observable<null | string> = of(null);
  loadingPercent = 0;
  intervalId = {} as any;
  constructor(private http: HttpClient, private api: ApiService, private downloads: DownloadService) { }

  ngOnInit(): void {
    this.blockedDocument = true;
    this.startLoading()
    this.api.getProcess().subscribe(response => {
      this.loadingPercent = 100;
      setTimeout(()=>{
        this.result = response
        console.log(response)
        this.filename = response.filename
        console.log('this.result.class '+this.result.class)
        console.log(this.result.start_time)
        if(this.result.script == 'ไม่สามารถตรวจจับคำพูดได้'){
          this.noResult = true;
          console.log(this.noResult);
        }
        if(this.result.class.length == 0){
          this.noEnvi = true;
          console.log(this.noResult);
        }
        this.video()
      }, 2000)
    }, (err) => {
      this.errorMsg = err.message
      this.isError = true;
    });
  }
  startLoading() {
    this.isStart = true;
    this.intervalId = setInterval(() => {
      if (this.loadingPercent < 98) {
        this.loadingPercent += 1;
      }
    }, 550);
  }
  progressInLoading() {
    if (this.loadingPercent === 100) {
      clearInterval(this.intervalId);
      this.res = of("Item Loaded");
    }
    console.log('Loading: ' + this.loadingPercent + '% completed.');
  }
  video(){
    this.api.getVideo().subscribe(response => {
    console.log(response)
    const video = document.getElementById("vdo") as HTMLVideoElement 
    video.src = window.URL.createObjectURL(response)
    })
  }
  copyMessage() {
    this.isCopy = true;
    this.message = 'Copied'
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.result?.script;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  getTranscriptions(): any {
    try{
      this.result?.transcription.data.results[0].predictions!
      return this.result?.transcription.data.results[0].predictions!
    }
    catch(e) {
      this.noResult = true;
      // console.log(this.noResult);
    }  
  }
  again(): void {
    this.api.getAgain().subscribe(response => {
      this.noResult = false;
    });
  }
  download(): void {
    this.downloads
      .download('http://127.0.0.1:5000/get_file/result.zip')
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'result.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
  video_download(): void {
    this.downloads
      .download('http://127.0.0.1:5000/get_video/video.mp4')
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'result.mp4';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
}
