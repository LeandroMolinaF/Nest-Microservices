import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../core/models/user.interface';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public login() {
    const user: Login = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authService.login(user).subscribe({
      next: () => {
        this.router.navigateByUrl('criminals');
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
