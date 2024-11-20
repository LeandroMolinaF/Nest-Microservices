import { Component, Input, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Criminal } from '../../core/models/criminal.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CriminalService } from '../../core/services/criminal.service';

@Component({
  selector: 'app-criminal-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './criminal-detail.component.html',
  styleUrl: './criminal-detail.component.css'
})
export class CriminalDetailComponent implements AfterViewInit {

  @Input() criminal!: Criminal;
  @Output() updateCriminals = new EventEmitter<any>()


  criminalForm: FormGroup;
  isEditing = false;

  constructor(private criminalService: CriminalService) {
    this.criminalForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('',),
      height: new FormControl('', Validators.required),
      colourOfEyes: new FormControl('',),
      colourOfHair: new FormControl('',),
      characteristics: new FormControl('',),
      charges: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit(): void {
    // Solo se ejecuta después de que la vista está completamente cargada
    if (this.criminal) {
      this.setFormData(this.criminal);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si los datos de criminal cambian, actualizar el formulario
    if (changes['criminal'] && this.criminal) {
      this.setFormData(this.criminal);
    }
  }

  setFormData(criminal: Criminal): void {
    const formattedDate = this.formatDate(criminal.dateOfBirth);
    this.criminalForm.patchValue({
      ...criminal,
      dateOfBirth: formattedDate
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  enableEdit() {
    this.isEditing = true;
  }

  saveChanges() {
    if (this.criminalForm.valid) {
      const criminalEdit: Criminal = this.criminalForm.value;
      criminalEdit.dateOfBirth = new Date(criminalEdit.dateOfBirth); // Volver a convertir la fecha a un objeto Date
      console.log(criminalEdit);
      this.criminalService.updateCriminal(this.criminal.id, criminalEdit).subscribe(result => {
        console.log(result);
        this.isEditing = false;
        alert("Datos editados correctamente")
        this.updateCriminals.emit(result);
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.setFormData(this.criminal); // Restauramos los datos originales del criminal
  }
}
