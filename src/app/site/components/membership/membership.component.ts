import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_helpers/global.service';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { Title } from '@angular/platform-browser';
import { AccountService } from 'src/app/account/services/account.service';
import { User, Role } from 'src/app/account/models/User';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SiteService } from '../../services/site.service';
import { SnotifyService } from 'ng-snotify';

export interface DialogData {
  animal: string;
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  loading = false;
  submitted = false;
  cancelsubmit = false;
  title = 'Membership';
  plans = [];
  form: FormGroup;
  errors = [];
  selectedPlanAmount = null;
  user: User;
  selectedPlanTotalAmount: number;
  selectedPlanDuration = null;
  displayCancelBtn = false;

  animal: string;


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
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private titleService: Title,
    public dialog: MatDialog,
    public siteService: SiteService
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
    }, (error: Response) => {
      this.gs.handleErrors(error);
      this.submitted = false;
    });
  }

  get f() { return this.form.controls; }

  createPlan() {
    this.form = this.fb.group({
      plan: new FormControl('', [Validators.required]),
      name: ['', [Validators.required]],
      terms: new FormControl('', [Validators.required]),
      respect: new FormControl('', [Validators.required]),

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
      localStorage.setItem('role', Role.Coache);
      this.router.navigate(['/account']);
    }, (error: Response) => {
      this.gs.handleErrors(error);
      this.submitted = false;
      this.loading = true;
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
            }, (error: Response) => {
              this.gs.handleErrors(error);
              this.submitted = false;
              this.loading = true;
            });


        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.submitted = false;
        }
      });
  }

  agreement() {
    this.submitted = true;

    if (this.form.invalid) { 
      //this.submitted = false;
      return; 
    }
    this.loading = true;
    let plan_id = this.user.userProfile.plan_id;
    (plan_id == null) ? this.executeAgreement() : this.switchAgreement();
   
  }

  selectedPlan(plan) {
    this.selectedPlanAmount = plan.amount;
    const setting = JSON.parse(localStorage.getItem('setting'));
    this.selectedPlanTotalAmount = parseFloat(this.selectedPlanAmount) + parseFloat(setting.setup_fee);
    this.selectedPlanDuration = (plan.id > 1) ? 'year' : 'month'
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '300px',
      data: {animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      /*this.siteService.promo(result)
        .subscribe((data: any) => {
          if(data.code =='sucess'){          
            localStorage.setItem('role', Role.Promo);
            this.router.navigate(['/account']);
          }else{
            this.animal = data.msg;
          }
          
        }, (error: Response) => {
          this.gs.handleErrors(error);
        });*/
      
    });
  }


}

// Dilog Component 

@Component({
  selector: 'dialog-overview',
  styles: ['.mat-form-field {width: 100%;}'],
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {

  public promoCode: any;
  public animal2 = {};

  constructor(
    private router: Router,
    private gs: GlobalService,
    private snotifyService: SnotifyService,
    public siteService: SiteService,
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
       
    }

  

  onNoClick(): void {

    this.dialogRef.close();

  }
  onApplyClick(): void {

    this.siteService.promo(this.promoCode)
      .subscribe((data: any) => {
        if(data.code =='success') {          
          this.snotifyService.success('Promo code apply successfully.', {showProgressBar: false});
          localStorage.setItem('role', Role.Promo);
          this.router.navigate(['/account']);
          this.dialogRef.close();
        } else {
          //this.animal2 = data.msg;
          this.snotifyService.error(data.msg, {showProgressBar: false});
        }
        
      }, (error: Response) => {
        this.gs.handleErrors(error);
    });
    
  }
}