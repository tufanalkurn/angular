import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'About';
  constructor(
    private gs: GlobalService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
  }

}
