import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
  }
  displayBasic: boolean = false;
  
  showBasicDialog() {
    this.displayBasic = true;
  }
}
