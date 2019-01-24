import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { SnotifyService } from 'ng-snotify';
import { SiteService } from '../../services/site.service';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'Contact';
  contact: FormGroup;
  public submmited = false;
  public siteKey = environment.recaptchaSiteKey;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsExpired = false;
  public errors = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snotifyService: SnotifyService,
    private siteService: SiteService,
    private cdr: ChangeDetectorRef,
    private gs: GlobalService,
    private titleService: Title
  ) { }

  get form() {return this.contact.controls;}

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createContactForm();
  }

  onContact(contact) {
    this.submmited = true;
    console.log(contact.value);
    if (!contact.valid) return false;
    this.siteService.contactForm(contact.value)
    .subscribe((data: any) => {
    }, (error: Response) => this.handleErrors(error));
  }

  createContactForm() {
    this.contact = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      reCaptcha: new FormControl('', [Validators.required])
    })
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
  }

  public handleErrors(error: any) {
    let httpErrorCode = error.status;
    this.clearErrorMessages();
  }

  clearErrorMessages() {
    this.errors = [];

  }

}
