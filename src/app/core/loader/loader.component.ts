import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { LoaderService, LoaderEvent, LoaderEventType } from './loader.service';
import { isPresent } from './loader.utils';

@Component({
  selector: 'app-loader',
  template: `
    <div class="slim-loading-bar">
      <div class="slim-loading-bar-progress" [style.width]="progress + '%'" [style.backgroundColor]="color" [style.color]="color"
          [style.height]="height" [style.opacity]="show ? '1' : '0'"></div>
    </div>
  `,
  styles: [
    `.slim-loading-bar {
      position: fixed;
      margin: 0;
      padding: 0;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
  }
  .slim-loading-bar-progress {
      margin: 0;
      padding: 0;
      z-index: 99998;
      background-color: green;
      color: green;
      box-shadow: 0 0 10px 0; /* Inherits the font color */
      height: 2px;
      opacity: 0;
  
      /* Add CSS3 styles for transition smoothing */
      -webkit-transition: all 0.5s ease-in-out;
      -moz-transition: all 0.5s ease-in-out;
      -o-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
  }`
  ]
})
export class LoaderComponent implements OnInit {

  @Input() progress: string = '0';
  @Input() color: string = 'firebrick';
  @Input() height: string = '2px';
  @Input() show: boolean = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.events.subscribe((event: LoaderEvent) => {
      if (event.type === LoaderEventType.PROGRESS && isPresent(event.value)) {
        this.progress = event.value;
      } else if (event.type === LoaderEventType.COLOR) {
        this.color = event.value;
      } else if (event.type === LoaderEventType.HEIGHT) {
        this.height = event.value;
      } else if (event.type === LoaderEventType.VISIBLE) {
        setTimeout(() => {
          this.show = event.value;
        });
      }
    });
  }
}
