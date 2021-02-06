import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CommonDataService } from './CommonDataService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'BarclaysECommerce';

  
  constructor(private http: HttpClient, private commonDataSer: CommonDataService, private router: Router){}

  searchObject = {
    searchValue : ""
  }

  cartCount = 0 ;

  ngOnInit(){
    this.commonDataSer.cart.subscribe( data=> {
      this.cartCount = +data ;
    })
  }

  searchFunc(){
   this.commonDataSer.headerChange(this.searchObject.searchValue) ;
   this.router.navigate(["/"])
  }

  navigateToCart(){
    this.router.navigate(["/cart"])
  }

}
