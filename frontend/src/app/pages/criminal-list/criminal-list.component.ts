import { Component, OnDestroy, OnInit } from '@angular/core';
import { CriminalService } from '../../core/services/criminal.service';
import { Criminal } from '../../core/models/criminal.interface';
import { HttpClientModule } from '@angular/common/http';
import { CriminalAddComponent } from "../criminal-add/criminal-add.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CriminalDetailComponent } from '../criminal-detail/criminal-detail.component';

@Component({
  selector: 'app-criminal-list',
  standalone: true,
  imports: [HttpClientModule, CriminalAddComponent, NavbarComponent, CommonModule, CriminalDetailComponent],
  templateUrl: './criminal-list.component.html',
  styleUrl: './criminal-list.component.css'
})
export class CriminalListComponent implements OnInit, OnDestroy  {
  constructor(private criminalService: CriminalService) {}
  ngOnInit(): void {
    this.getAllCriminals();
  }
  ngOnDestroy(): void {
  }

  public criminals: Criminal[] = [];

  public crimz!: Criminal;

  public getAllCriminals() {
    this.criminalService.getAllCriminals().subscribe((criminals) => {
      this.criminals = criminals;
      console.log(criminals)
    });
  }

  public detail(criminal: Criminal){
    this.crimz = criminal
  }

  public updateCriminalList(updatedCriminal: any) {
    const index = this.criminals.findIndex(c => c.id === updatedCriminal.id);
    if (index !== -1) {
      this.criminals[index] = { ...updatedCriminal };
    }
  }

}
