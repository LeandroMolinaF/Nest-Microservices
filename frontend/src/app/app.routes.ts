import { Routes } from '@angular/router';
import { CriminalListComponent } from './pages/criminal-list/criminal-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full',},
    { path: 'home', component:HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'criminals', component: CriminalListComponent, },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];
