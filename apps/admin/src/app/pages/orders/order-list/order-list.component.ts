import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@eshop/orders';
import { Router } from '@angular/router';


  @Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})


export class OrderListComponent implements OnInit {
  orders: Order[] = [];
    messageService: any;
  
  constructor(
    private router: Router,

    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this._getOrders();

  }

 
  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/form/${orderId}`);
  }


  
  deleteOrder(orderId: string) {
       this.ordersService.deleteOrder(orderId).subscribe( () => { 
        this._getOrders();
        this.messageService.add({severity:'success', summary:' success', detail:'User deleted'});
      });
  
    
    }
       
    }
  
  

