import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private searchValue = new BehaviorSubject<string>('');
  search = this.searchValue.asObservable();

  private cartValue = new BehaviorSubject<any>('');
  cart = this.cartValue.asObservable();

  private cartDetails = new BehaviorSubject<any>([]);
  cartList = this.cartDetails.asObservable();

  private booksInCart = new BehaviorSubject<any>([]);
  booksInCartList = this.booksInCart.asObservable();
 
  headerChange(message: string) {
    this.searchValue.next(message);
  }

  setBooksInCart(message: any) {
    this.booksInCart.next(message);
  }

  setCartValue(message: any) {
    this.cartValue.next(message);
  }

  setCartDetails(message: any) {
    this.cartDetails.next(message);
  }

}
