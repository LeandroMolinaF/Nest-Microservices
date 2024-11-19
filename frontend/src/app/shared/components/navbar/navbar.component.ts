import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  public logout(): void {
    if (this.authService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

}
