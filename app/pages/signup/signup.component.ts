import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  formSubmit() {
    this.userForm.controls['email'].markAsTouched();

    if (this.userForm.invalid) {
      if (this.userForm.controls['username'].invalid) {
        this.snack.open('Username required!', 'Accept', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }

      if (this.userForm.controls['email'].invalid) {
        if (this.userForm.controls['email'].errors?.['required']) {
          this.snack.open('Email required!', 'Accept', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        } else if (this.userForm.controls['email'].errors?.['email']) {
          this.snack.open('Invalid email format!', 'Accept', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      }
      return;
    }

    this.userService.añadirUsuario(this.userForm.value).subscribe(  //Proceed with form submission
      (data) => {
        console.log(data);
        Swal.fire('User Saved', 'User successfully registered in the system', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('An error occurred in the system!', 'Accept', {
          duration: 3000,
        });
      }
    );
  }
}
