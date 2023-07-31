import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService,
              private router: Router) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders()
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateOrderStatus(id: number, status: string) {
    this.orderService.updateOrderStatus(id, status)
      .subscribe(
        (updatedOrder: Order) => {
          this.router.navigateByUrl('/admin/orders-list', { skipLocationChange: true }).then(() => {
            //Para actualizar la página cuando le doy
            window.location.reload();
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getStatusClass(status: string): string {
    return status === 'Shipped' ? 'text-success' : 'text-danger';
  }
}