import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CriminalRegister } from '../../core/models/criminal.interface';
import { CriminalService } from '../../core/services/criminal.service';

@Component({
  selector: 'app-criminal-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './criminal-add.component.html',
  styleUrl: './criminal-add.component.css'
})
export class CriminalAddComponent {

  constructor(private criminalService: CriminalService) {}

  public criminalForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    placeOfBirth: new FormControl(''),
    height: new FormControl(''),
    colourOfEyes: new FormControl(''),
    colourOfHair: new FormControl(''),
    characteristics: new FormControl(''),
    charges: new FormControl('', Validators.required),
  });

  public createCriminal() {
    const criminal: CriminalRegister = {
      name: this.criminalForm.get('name')?.value,
      gender: this.criminalForm.get('gender')?.value,
      nationality: this.criminalForm.get('nationality')?.value,
      dateOfBirth: new Date(this.criminalForm.get('dateOfBirth')?.value),
      placeOfBirth: this.criminalForm.get('placeOfBirth')?.value,
      height: this.criminalForm.get('height')?.value,
      colourOfEyes: this.criminalForm.get('colourOfEyes')?.value,
      colourOfHair: this.criminalForm.get('colourOfHair')?.value,
      characteristics: this.criminalForm.get('characteristics')?.value,
      charges: this.criminalForm.get('charges')?.value,
    }
    this.criminalService.createCriminal(criminal).subscribe({
      next: (response) => {
        console.log(response);
        window.location.reload();
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  public clearForm() {
    this.criminalForm.reset({
      name: '',
      gender: '',
      nationality: '',
      dateOfBirth: '',
      placeOfBirth: '',
      height: '',
      colourOfEyes: '',
      colourOfHair: '',
      characteristics: '',
      charges: '',
    });
  }
}
