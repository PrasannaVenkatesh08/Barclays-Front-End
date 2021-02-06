import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../CommonDataService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http: HttpClient,private commonDataSer: CommonDataService, private router: Router) { }
  cartList = [];
  totalMoney =  0 ;

  placeOrderObj = {
    name : "",
    email :"",
    mobNumber : 9999999999,
    amount : 0
  }

  placeOrderEnable = false ;

  ngOnInit() {
    this.commonDataSer.cartList.subscribe(data => {
      this.cartList = data;
    })
    
    this.cartList.forEach( el => {
      el["count"] = 1 ;
      this.totalMoney += el["price"] ;
    })
    this.placeOrderObj.amount = this.totalMoney ;
  }

  removeFromCart(index: any) {
    var removed = this.cartList.splice(index, 1);
    removed["isCart"] = false;
    this.priceChange();
  }

  navigateToHome() {
    this.router.navigate(["/"]);
  }

  priceChange(){
    var price = 0 ;
    this.cartList.forEach( ele => {
      price += (ele["price"] * ele["count"]) ;
    })
    this.totalMoney = price ;
  }

  placeOrder(){
    this.http.post("http://localhost:2222/ecommerce/placeOrder",this.placeOrderObj).subscribe(
      data => {
        var response = data ;
        if( response["url"] != "" ){
          window.location.href = response["url"] ;
        }
      }
    )
  }

}
