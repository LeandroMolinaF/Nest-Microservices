import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from '../../core/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public register() {
    const user: UserRegister = {
      username: this.registerForm.get('username')?.value,
      mail: this.registerForm.get('mail')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.userService.register(user).subscribe({
      next: () => {
        this.router.navigateByUrl('login');
        alert('Registrado correctamente');
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
