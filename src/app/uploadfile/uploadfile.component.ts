import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  maxFileSize :number =1000;
  constructor() { }

  ngOnInit(): void {
  }

}
