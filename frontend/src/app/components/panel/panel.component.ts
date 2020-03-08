import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Router } from '@angular/router';
import { Panel } from '../../interfaces/panel';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  opened = true;
  mode: string;
  panel: Panel;
  test = 'Juan Jose';

  constructor(private panelServ: PanelService, private router: Router) {}

  ngOnInit() {
    this.getPanels();
    this.onRes();
    this.if500();
  }

  onRes() {
    this.mode = document.getElementById('sidenav').getAttribute('mode');
    if (window.innerWidth < 800) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }

  if500() {
    if (window.innerWidth < 500) {
      this.opened = false;
    }
  }

  routeDir(item) {
    this.router.navigate(['panel/', item]);
    this.if500();
  }

  getPanels() {
    this.panelServ.getPanels().subscribe(
      res => {
        this.panel = res;
        // console.log('panels', this.panel);
      }
    );
  }

}
