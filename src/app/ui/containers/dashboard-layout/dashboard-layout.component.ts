import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_helpers/global.service';
import { AccountService } from 'src/app/account/services/account.service';
import { Category } from 'src/app/account/models/Blog';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  error: {};
  item: {};
  public blogSlug; 
  
  constructor(
    private blogService: AccountService,
    private gs: GlobalService
  ) { 
    
  }

  ngOnInit() {
    this.blogService.listCategory().subscribe(
      (data: any) => {
        this.item = data.result;
        const item = data.result[0]
        this.blogSlug = item.slug;
      }, 
      error => this.error = error
    );
  }

}
