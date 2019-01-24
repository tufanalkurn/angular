import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  title = 'Reset Password';
  hide = false;

  reset: FormGroup;

  errors = [];

  get f() { return this.reset.controls; }
  
  constructor(
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private router: Router,
    private siteService: SiteService,
    public gs: GlobalService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createResetForm();
  }

  onReset(reset) {
    this.submitted = true;
    if (!reset.valid) { return false; }
    this.gs.clearErrorMessages();
    this.siteService.resetPassword(reset.value)
    .subscribe((data: any) => {
      this.submitted = false;
    }, (error: Response) => {
      this.gs.handleErrors(error)
      this.submitted = false;
    });
  }

  createResetForm() {
    this.reset = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
    }, {validators: MustMatch('password', 'confirmPassword')});
  }

}
