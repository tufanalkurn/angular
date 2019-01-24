import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  title = 'Faq';
  constructor(
    private gs: GlobalService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
  }

}
