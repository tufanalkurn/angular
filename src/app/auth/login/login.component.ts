import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';
import { Role } from 'src/app/account/models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  title = 'Login';

  form: FormGroup;

  errors = [];
  config = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private titleService: Title,
    private snotifyService: SnotifyService,
    private router: Router,
    public gs: GlobalService
    ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createGroup();
     if (this.authService.isAuthenticated()) {
      return this.router.navigate(['/account']);
    }
  }
  createGroup() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.gs.clearErrorMessages();
    this.authService.login(form.value)
      .subscribe((data: any) => {
        this.submitted = false;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.role);
        this.snotifyService.success('Login Successful.', {showProgressBar: false});
        this.router.navigate(['/' + (data.role == Role.User  ? 'membership' : 'account') ]);

      }, (error: Response) => {
        this.gs.handleErrors(error);
        this.submitted = false;
      });
  }  
}
