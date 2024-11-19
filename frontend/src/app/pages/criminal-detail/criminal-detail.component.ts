import { Component, Input, SimpleChanges } from '@angular/core';
import { Criminal, CriminalRegister } from '../../core/models/criminal.interface';
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
export class CriminalDetailComponent {

  @Input() criminal!: Criminal

  criminalForm: FormGroup;
  isEditing = false;

  constructor(private criminalService: CriminalService) {
    this.criminalForm = new FormGroup({
      id: new FormControl (null, Validators.required),
      name: new FormControl ('', Validators.required),
      gender: new FormControl ('', Validators.required),
      nationality: new FormControl ('', Validators.required),
      dateOfBirth: new FormControl ('', Validators.required),
      placeOfBirth: new FormControl ('', Validators.required),
      height: new FormControl ('', Validators.required),
      colourOfEyes: new FormControl ('', Validators.required),
      colourOfHair: new FormControl ('', Validators.required),
      characteristics: new FormControl ('', Validators.required),
      charges: new FormControl ('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['criminal'] && this.criminal) {
      const formattedDate = this.formatDate(this.criminal.dateOfBirth);
      
      if (this.criminal.dateOfBirth !== this.criminalForm.get('dateOfBirth')?.value) {
        this.criminalForm.patchValue({
          ...this.criminal,
          dateOfBirth: formattedDate,
        });
      }
    }
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
      criminalEdit.dateOfBirth = new Date(criminalEdit.dateOfBirth)
      console.log(criminalEdit)
      this.criminalService.updateCriminal(+this.criminal.id, criminalEdit).subscribe(result => {
        console.log(result)
        this.isEditing = false;
      })
    }
  }

  cancelEdit() {
    this.isEditing = false;
    const formattedDate = this.formatDate(this.criminal.dateOfBirth);
    
    this.criminalForm.patchValue({
      ...this.criminal,
      dateOfBirth: formattedDate
    });
  }

}
