import { Component, OnDestroy, OnInit } from '@angular/core';
import { CriminalService } from '../../core/services/criminal.service';
import { Criminal } from '../../core/models/criminal.interface';
import { HttpClientModule } from '@angular/common/http';
import { CriminalAddComponent } from "../criminal-add/criminal-add.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criminal-list',
  standalone: true,
  imports: [HttpClientModule, CriminalAddComponent, NavbarComponent, CommonModule],
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



  public getAllCriminals() {
    this.criminalService.getAllCriminals().subscribe((criminals) => {
      this.criminals = criminals;
    });
  }
}
