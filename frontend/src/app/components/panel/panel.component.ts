import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  opened = true;
  mode: string;

  constructor() {

  }

  ngOnInit() {
  }

  onRes() {
    this.mode = document.getElementById('sidenav').getAttribute('mode');
    if (window.innerWidth < 800) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }
}
