import { Component, OnInit, Input } from '@angular/core';
import {AccountService} from "../../../account/services/account.service";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/_helpers/global.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Blog';
  ncate = [];
  ncateItem = [];
  blogCatSlug = false;
  prevCateSlug = false;
  nextSlug = false;
  basePath = environment.apiUrl; 

  fileToUpload: File = null;
  dashForm: FormGroup;
  uploadError = null;
  error = null;
  @Input() public parentBlogSlug: string;

  constructor(private accountService: AccountService,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              private blogService: AccountService,
              private titleService: Title,
              private gs: GlobalService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);

    this.blogService.listCategory().subscribe( (data: any) => {
        if(data.result){
          const vCate = data.result[0].slug;
          this.router.navigate(['/account/blog/'+vCate]);
          //if(data.result[0].slug) {}
          this.blogService.viewCategory(vCate).subscribe(
            (data: any) => {
              //this.item = data;
              this.ncate = data.category;
              this.ncateItem = data.item;
              this.prevCateSlug = data.category.prev ? data.category.prev.slug : false;
              this.nextSlug = data.item[0] ? data.item[0].slug : false  
              this.blogCatSlug =  data.category ? data.category.slug : false;  
            }, 
            error => this.error = error
          );
        }
      }, 
      error => this.error = error
    );

  }
 
  
}
