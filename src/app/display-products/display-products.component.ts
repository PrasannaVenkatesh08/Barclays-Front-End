import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonDataService } from '../CommonDataService';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  constructor(private http: HttpClient, private commonDataSer: CommonDataService, config: NgbRatingConfig, private router: Router) { 
    config.max = 5;
    config.readonly = true;
  }

  loader = true ; 
  noBooks = false ;

  cartDetails = [] ;

  fetchProdObject = {
    sortBy : "average_rating",
    sortType : "DESC",
    searchBy : "title",
    searchValue : "",
    currentPage : 1,
    itemsPerPage : 10,
    startPage : 1,
    endPage: 1,
    totalPages : 1,
    totalRecords : 10
  }

  page = 1 ;
  totalRecords : 10;

  @Input() searchValue: string;

  productDetails = [] ;
  subHeaders = [] ;
  // booksInCart = [] ;

  ngOnInit() {
    this.getSubHeaders() ;
    this.commonDataSer.cartList.subscribe(data => {
      var response = [] ;
      response = data ;
      this.cartDetails = response ;
    }) ;
    this.commonDataSer.setCartValue(this.cartDetails.length) ;
    this.commonDataSer.search.subscribe( 
      data=> { 
        this.fetchProdObject.searchValue = data ;
        this.fetchProducts();
      }
    ) ;
    // this.commonDataSer.booksInCartList.subscribe(
    //   data => {
    //     this.booksInCart = data ;
    //   }
    // )
    
  }

  navigateToCart(){
    // this.commonDataSer.setBooksInCart(this.booksInCart) ;
    this.router.navigate(["/cart"])
  }

  fetchProducts(){ 
    this.loader = true ;
    this.http.post("http://localhost:2222/ecommerce/fetchProducts",this.fetchProdObject).subscribe(
      data => {
        var response = data ;
        this.productDetails = response["listOfProducts"] ;
        this.fetchProdObject.currentPage = response[""] ;
        this.fetchProdObject.totalRecords = this.productDetails.length ;
        this.loader = false ;
        if(this.productDetails.length == 0 ){
          this.noBooks = true ;
        }
      },error=>{
        this.noBooks = true ;
      }
    )
  }

  addToCart(product:any){
    product["inCart"] = true ;
    if(!this.cartDetails.includes(product)){
      this.cartDetails.push(product) ;
      this.commonDataSer.setCartValue(this.cartDetails.length) ;
      this.commonDataSer.setCartDetails(this.cartDetails) ;
      // this.booksInCart.push(product["bookID"]) ;
      console.log(this.cartDetails) ;
    }
  }

  getSubHeaders(){
    this.http.get("http://localhost:2222/ecommerce/fetchHeaders").subscribe(
      data => {
        var response = data ;
        this.subHeaders = response["headerName"] ;
      }
    )
  }

  buyButton(product:any){
    this.addToCart(product) ;
    this.navigateToCart() ;
  }

}
