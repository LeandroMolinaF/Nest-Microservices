import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-institution',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.css'
})
export class InstitutionComponent {
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('token')!.toUpperCase()
  }

  username: string = "";

  goToCriminals() {
    this.router.navigate(['/criminals']);
  }
}
