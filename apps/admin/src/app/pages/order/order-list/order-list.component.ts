import { Component, OnInit } from '@angular/core';
import { Session, UsersService } from '@eshop/products';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-orderss',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})
export class OrderListComponent implements OnInit {
  sessions: Session[] = [];
  messageService: any;


  constructor(
    private router: Router,
    private sessionService: UsersService,
  ) { }

  ngOnInit(): void {
    this._getOrders();

  }
  _getOrders() {
    this.sessionService.getSession().subscribe((sessions) => {
      this.sessions = sessions;
    });
  }
  showSession(orderId) {
    this.router.navigateByUrl(`session/form/${orderId}`);
  }
}
