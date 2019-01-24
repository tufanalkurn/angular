import { Component, OnInit, ViewChild } from '@angular/core';
import { Role, User } from '../../models/User';
import { AccountService } from '../../services/account.service';
import { StripeService, ElementsOptions, ElementOptions, StripeCardComponent } from 'ngx-stripe';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  title = 'Membership';
  userRol: Role;
  submitted = false;
  user: User;
  
  plans = [];

  form: FormGroup;

  selectedPlanTotalAmount: number;
  selectedPlanDuration = null;
  displayCancelBtn = false;
  cancelsubmit = false;
  selectedPlanAmount = null;


  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(
    private accountService: AccountService,
    private stripeService: StripeService,
    private authService: AuthService,
    private snotifyService: SnotifyService,
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private titleService: Title,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.createPlan();
    this.accountService.profile()
      .subscribe((data: any) => {
        this.user = data.user;
        //console.log(this.user);
        this.displayCancelBtn = (this.user.userProfile.plan_id > 0) ? true : false;
      });

    this.accountService.plans().subscribe((data: any) => {
      this.plans = data.plans;
      //console.log(data.plans);
    }, (error: Response) => {
      this.gs.handleErrors(error);
      this.submitted = false;
    });

  }

  createPlan() {
    this.form = this.fb.group({
      plan: new FormControl('', [Validators.required]),
      name: new FormControl(''),
    });
  }

  switchAgreement(){

    const name = this.form.get('name').value;
    const plan = this.form.get('plan').value;
    
    let data = {
      plan_id: plan,
      name: name,
    };

    this.accountService.switchAgreement(data)
    .subscribe((data: any) => {

      this.gs.msg(data.code, data.msg);   
      this.submitted = false;
      //localStorage.setItem('role', Role.Coache);
      this.router.navigate(['/account']);
    }, (error: Response) => {
      this.gs.handleErrors(error);
      this.submitted = false;
    });

  }

  executeAgreement(){
    
    const name = this.form.get('name').value;
    const plan = this.form.get('plan').value;

    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {

          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges  
          
          let data = {
            plan_id: plan,
            name: name,
            id: result.token.id,
          };


          this.accountService.executeAgreement(data)
            .subscribe((data: any) => {

          this.gs.msg(data.code, data.msg);    
          localStorage.setItem('role', Role.Coache);
          this.router.navigate(['/account']);
              this.submitted = false;

            }, (error: Response) => {
              this.gs.handleErrors(error);
              this.submitted = false;
            });


        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.submitted = false;
        }
      });
  }

  agreement() {
    if (!this.form.valid) { return false; }
    this.submitted = true;
    let plan_id = this.user.userProfile.plan_id;
    (plan_id == null) ? this.executeAgreement() : this.switchAgreement();
   
  }

  selectedPlan(plan) {
    this.selectedPlanAmount = plan.amount;
    const setting = JSON.parse(localStorage.getItem('setting'));
    this.selectedPlanTotalAmount = parseFloat(this.selectedPlanAmount) + parseFloat(setting.setup_fee);
    this.selectedPlanDuration = (plan.id > 1) ? 'year' : 'month'
  }

  cancellation() {
    this.cancelsubmit = true;
    this.accountService.cancelAgreement()
      .subscribe((data: any) => {
        this.cancelsubmit = false;
        this.displayCancelBtn = false;
        localStorage.setItem('role', Role.User);
        this.router.navigate(['/membership']);
        this.gs.msg(data.code, data.msg);  
        
      }, (error: Response) => {
        this.gs.handleErrors(error);
        this.submitted = false;
      });
  }

}
