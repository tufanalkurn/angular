import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { GlobalService } from 'src/app/_helpers/global.service';
import { SnotifyService } from 'ng-snotify';
import { User } from '../../models/User'; 
import { HeaderComponent } from 'src/app/ui/components/header/header.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  providers:[HeaderComponent],
})
export class UpdateProfileComponent implements OnInit {

  submitted = false;
  currentDate = new Date();
  errors = [];
  form: FormGroup;
  user: User; 
  fileToUpload: File = null;
  dob = null;
  
  topName: string;

  message: string = "Hola Alkurn!"

  //@Output() messageEvent = new EventEmitter<>();
   
    
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.updateForm();
    this.accountService.profile()
      .subscribe((data: any) => {
        this.user = data.user; 
        this.topName = data.user.userProfile.full_name;
        //console.log(this.topName);
        let microTime = (parseInt(this.user.userProfile.dob) * 1000);       
        if(microTime > 0){
          this.dob = new Date(microTime);
        }
        
        this.form.patchValue({
          full_name: this.user.userProfile.full_name,
          email: this.user.email,
          telephone: this.user.userProfile.telephone
        });
      });

      
      
  }

  updateForm() {
    this.form = this.fb.group({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl({value: '', disabled: true}, [Validators.required]),
      telephone: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (!form.valid) {
      this.submitted = false;
      return;
    }
    this.gs.clearErrorMessages(); 

    this.accountService.updateProfile(form.value)
      .subscribe((data: any) => {
        this.snotifyService.success('Profile details has been updated successfully.', {showProgressBar: false});
        this.submitted = false; 
        this.topName = data.user.userProfile.full_name;
        localStorage.setItem('user', JSON.stringify(data.user)); 
        this.accountService.sendMessage('Good Morning');
        
      }, (error: Response) => {
        this.gs.handleErrors(error);
        this.submitted = false;
      });
  }  

  setFile(field, data){
    this.form.get(field).setValue(data.file.id);
  }

  onUpload(e) {
    let files:FileList = e.target.files;
    this.fileToUpload = files.item(0);
    this.gs.upload(this.fileToUpload).subscribe(data => this.setFile(e.target.id, data), error => {
        console.log(error);
      }); 
  } 

  // greetStudent() {
  //   this.accountService.sendMessage('Good Morning');
  // }

}
