import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  submitted = false;
  title = 'Forgot Password';
  forgot: FormGroup;

  errors = [];

  constructor(
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private router: Router,
    private siteService: SiteService,
    public gs: GlobalService,
    private titleService: Title
  ) { }

  get f() { return this.forgot.controls; }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createForgotForm();
  }

  onForgot(forgot) {
    this.submitted = true;
    if (!forgot.valid) { return false; }
    this.gs.clearErrorMessages();
    this.siteService.forgotPassword(forgot.value)
    .subscribe((data: any) => {
      //console.log(data);
      this.snotifyService.success (
        'A link to reset your password has been sent on your email address.',
        {showProgressBar: false, timeout: 0}
      );
      this.router.navigate(['/login']);
    }, (error: Response) => {
        this.gs.handleErrors(error);
        this.submitted = false;
    });
  }

  createForgotForm() {
    this.forgot = this.fb.group({
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    });
  }

}
