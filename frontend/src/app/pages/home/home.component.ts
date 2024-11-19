import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CriminalService } from '../../core/services/criminal.service';
import { Criminal } from '../../core/models/criminal.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  crimes = [
    {
      title: 'Robo de Grandes Dimensiones',
      description: 'Un caso resuelto donde se recuperaron millones de dólares robados en una operación criminal internacional.',
      image: 'https://via.placeholder.com/500x300?text=Robo',
      imagePosition: 'left' // 'left' o 'right' para alternar la posición
    },
    {
      title: 'Asalto a Mano Armada',
      description: 'Rápida acción de la policía resolvió el asalto a mano armada que aterrorizó a los ciudadanos en el centro de la ciudad.',
      image: 'https://via.placeholder.com/500x300?text=Asalto',
      imagePosition: 'right'
    },
    {
      title: 'Fraude Bancario Internacional',
      description: 'Se logró desmantelar una red de fraude bancario internacional que afectó a miles de personas.',
      image: 'https://via.placeholder.com/500x300?text=Fraude',
      imagePosition: 'left'
    }
  ];

  constructor(
    private router: Router,
    private criminalService: CriminalService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('token')!.toUpperCase()
    this.getAllCriminals()
  }

  username: string = "";
  criminals: Criminal[] = []

  goToCriminals() {
    this.router.navigate(['/criminals']);
  }

  public getAllCriminals() {
    this.criminalService.getAllCriminals().subscribe((criminals) => {
      this.criminals = criminals;
    });
  }
}
