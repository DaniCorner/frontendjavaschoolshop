import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router'; 
import { OrderItem } from 'src/app/common/order-item';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public get loginService(): LoginService {
    return this._loginService;
  }
  public set loginService(value: LoginService) {
    this._loginService = value;
  }

  user: any;
  orderItems: OrderItem[] = [];
  private baseUrl = 'http://localhost:8080'; 
  private imageBaseUrl = 'http://localhost:8080/usuarios/';

  constructor(
    private userService: UserService,
    private _loginService: LoginService,
    private router: Router,
    private orderService: OrderService,
    private httpClient: HttpClient  
    ) { }

  ngOnInit(): void {
    const username = this.loginService.getUser().username;
    this.userService.obtenerUsuario(username).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.loadOrderItemsByUsername(username);
  }

  loadOrderItemsByUsername(username: string): void {
    this.orderService.getOrderItemsByUsername(username)
      .subscribe(
        (orderItems: OrderItem[]) => {
          this.orderItems = orderItems;
        },
        (error: any) => {
        }
      );
  }

  isSameAsPrevious(currentItem: OrderItem, previousItem: OrderItem): boolean {
    return (
      currentItem.order?.orderTrackingNumber === previousItem.order?.orderTrackingNumber &&
      currentItem.order?.totalQuantity === previousItem.order?.totalQuantity &&
      currentItem.order?.totalPrice === previousItem.order?.totalPrice &&
      currentItem.order?.status === previousItem.order?.status &&
      currentItem.order?.shippingAddress?.street === previousItem.order?.shippingAddress?.street &&
      currentItem.order?.shippingAddress?.city === previousItem.order?.shippingAddress?.city &&
      currentItem.order?.shippingAddress?.state === previousItem.order?.shippingAddress?.state &&
      currentItem.order?.shippingAddress?.country === previousItem.order?.shippingAddress?.country &&
      currentItem.order?.shippingAddress?.zipCode === previousItem.order?.shippingAddress?.zipCode
    );
  }  

changeImage() {
  event.preventDefault(); //Para evitar comportamiento extraño de reload de página
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.httpClient.post<any>(`${this.baseUrl}/usuarios/${this.user.id}/perfil`, formData, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          this.user.imageURL = response.imageURL;
          window.location.reload();          
                  },
        (error: any) => {
          console.error('Error uploading image:', error);
        }
      );
  }
}

getUserImageURL(): string | undefined {
  return this.user?.perfil ? this.imageBaseUrl + this.user.perfil : undefined;
}

actualizarUsuario(): void {
  const username = this.user.username;
  const usuarioActualizado = {
    nombre: this.user.nombre,
    apellido: this.user.apellido,
    email: this.user.email,
    telefono: this.user.telefono,
    password: this.user.password,
    perfil: this.user.perfil
  };

  this.userService.actualizarUsuario(username, usuarioActualizado).subscribe(
    (response: any) => {
      console.log("Usuario actualizado:", response);
      this.router.navigateByUrl('user-dashboard', { skipLocationChange: true }).then(() => {
        window.location.reload();
      });
    },
    (error: any) => {
      console.error(error);
    }
  );
}
}