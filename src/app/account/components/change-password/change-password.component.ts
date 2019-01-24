import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../services/account.service";
import {SnotifyService} from "ng-snotify";
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  loading = false;
  title = "Change Password";
  hide = false;

  form: FormGroup;

  username: null;

  errors = [];
  config = [];

  constructor(
      private accountService: AccountService,
      private authService: AuthService,
      private snotifyService: SnotifyService,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private titleService: Title,
      public gs: GlobalService) {
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createChangedPasswordForm();
    this.accountService.profile();

    

  }
 

  createChangedPasswordForm() {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required]),    
      newpass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      repeatnewpass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
    }, {validators: MustMatch('newpass', 'repeatnewpass')});
  }


  onSubmit(form) {
    this.submitted = true;
    if (!form.valid) {
      this.submitted = false;
      return;
    }
    
    this.accountService.changedPassword(form.value)
        .subscribe((data: any) => {
          this.submitted = false;
          this.snotifyService.success('Password successful changed.', {showProgressBar: false});
          this.submitted = false;
          //this.router.navigate(['/account']);
        }, (error: Response) => {
          this.gs.handleErrors(error);
          this.submitted = false;
        });
  } 


  
 

}
