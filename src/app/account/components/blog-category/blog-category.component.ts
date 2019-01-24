import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/_helpers/global.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from '../../models/Blog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

  title = 'Blog';
  ncate = [];
  error: {};

  ncateItem = [];
  blogCatSlug = false;
  prevCateSlug = false;
  nextSlug = false;

  basePath = environment.apiUrl; 

  constructor(
    private blogService: AccountService,
    private titleService: Title,
    private gs: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.viewCategory( params.get('slug') )
      )
    ).subscribe(
      (data: any) => {
        this.ncate = data.category;
        this.ncateItem = data.item;
        this.prevCateSlug = data.category.prev ? data.category.prev.slug : false;
        this.nextSlug = data.item[0] ? data.item[0].slug : false  
        this.blogCatSlug =  data.category ? data.category.slug : false; 
        //console.log(this.nextSlug);
        
        this.titleService.setTitle(this.gs.mainTitle + ' | ' + data.category.name);
      }, error => this.error = error
    );
    
  }

}
