import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { IAllOrdersRes } from '../../interfaces/IAllOrders';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders implements OnInit {
  private readonly _OrderService = inject(OrderService);
  allOrders!: IAllOrdersRes[];

  ngOnInit(): void {
    this.getUserAllOrders();
  }

  getUserAllOrders(): void {
    this._OrderService.getUserAllOrders().subscribe(res => {
      this.allOrders = res;
      console.log(res);
    });
  }
}
