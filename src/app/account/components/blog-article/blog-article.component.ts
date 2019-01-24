import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_helpers/global.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { Title } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {

  title = null;

  error: {};

  selectedIndex: number;

  blog = [];
  blogCate = [];
  prevSlug = false;
  nextSlug = false;
  blogCatSlug = false;
  video = null;
  vimeo_iframe_html: any;

  //vimeoUrl2 = "https://vimeo.com/310769096";
  //vimeoUrl2 = "https://vimeo.com/312675554";
  //vimeoUrl2 = 'https://vimeo.com/197933516';

  constructor(
    private route: ActivatedRoute,
    private gs: GlobalService,
    private titleService: Title,
    private accountService: AccountService,
    private embedService: EmbedVideoService
  ) { 
    
    /*this.vimeo_iframe_html = this.embedService.embed(this.vimeoUrl2, {
      attr: { width: 800, height: 250, class: 'w-100' }
    });*/
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.accountService.getArticle(params.get('slug'))
      )
    ).subscribe(
      (data: any) => {
        this.blog = data.post;
        this.blogCate = data.post.category;
        
        this.prevSlug = data.post.prev ? data.post.prev.slug : false;
        this.nextSlug = data.post.next ? data.post.next.slug : false  
        this.blogCatSlug =  data.post.category ? data.post.category.slug : false; 
        this.titleService.setTitle(this.gs.mainTitle + ' | ' + data.post.title);        
        
        if(data.post.videos != null){ 
          for (let video of data.post.videos)  {
            this.video = video;
          }
          this.loadVideo(this.video);   
        }


      }, error => this.error = error
    )

  }

  loadVideo (video){ 
      this.vimeo_iframe_html = this.embedService.embed(video.link, { attr: { width: 800, height: 250, class: 'w-100 border' } });
  }

  activateClass(index: number) {
    this.selectedIndex = index;
  }

}
