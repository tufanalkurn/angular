import { Directive, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective implements OnInit, OnDestroy {

  @Input('appFormError') messages: string[];

  @Input('messageKey') messageKey: string;

  constructor() {}

  ngOnInit() {
    console.log(this.messages)
    console.log(this.messageKey)
  }

  ngOnDestroy() {

  }
}
