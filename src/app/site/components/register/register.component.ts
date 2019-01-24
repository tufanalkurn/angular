import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  title = 'Register';
  hide = false;

  form: FormGroup;

  errors = [];


  constructor(
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private router: Router,
    private siteService: SiteService,
    public gs: GlobalService,
    private titleService: Title
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createRegisterForm();
  }

  onRegister(form) {
    this.submitted = true;
    if ( !form.valid ) { return false; }
    this.gs.clearErrorMessages();
    this.siteService.register(form.value)
    .subscribe((data: any) => {
      this.snotifyService.success('Registration Successful. Please login to continue.', {showProgressBar: false});
      this.router.navigate(['/login']);
    }, (error: Response) => {
        this.gs.handleErrors(error);
        this.submitted = false;
    });
  }

  createRegisterForm() {
    this.form = this.fb.group({
      full_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
    }, {validators: MustMatch('password', 'confirmPassword')});
  }

}
