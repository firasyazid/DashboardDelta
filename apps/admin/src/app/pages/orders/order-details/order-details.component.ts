import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  order: Order;


  constructor(private orderService: OrdersService,    private messageService: MessageService,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this._getOrder(); 
  }
  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
         });
      }
    });
  }
}
