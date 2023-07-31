import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ProductQuantity } from '../../../common/product-quantity';
import { AddressCountDTO } from 'src/app/common/address-count-dto';
import { RevenueStats } from 'src/app/common/revenuestats';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  productQuantities: ProductQuantity[] = [];
  addressCounts: AddressCountDTO[] = [];
  revenueStats: Object[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProductQuantities();
    this.getAddressCounts();
    this.getRevenueStats();
  }

  fetchProductQuantities(): void {
    this.apiService.getProductQuantities().subscribe(
      (response: ProductQuantity[]) => {
        this.productQuantities = response;
      },
      (error: any) => {
        console.error('Failed to fetch product quantities:', error);
      }
    );
  }

  getAddressCounts(): void {
    this.apiService.getAddressCounts().subscribe(
      (data: AddressCountDTO[]) => {
        this.addressCounts = data;
      },
      (error: any) => {
        console.error('Failed to fetch address counts:', error);
      }
    );
  }

  getRevenueStats(): void {
    this.apiService.getRevenueStats()
      .subscribe(stats => this.revenueStats = stats);
  }   

  isFirstElement(index: number): boolean {
    return index === 0;
  }

  isSecondElement(index: number): boolean {
    return index === 1;
  }

  isThirdElement(index: number): boolean {
    return index === 2;
  }
}
