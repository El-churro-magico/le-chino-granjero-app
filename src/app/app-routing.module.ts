import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// En este archivo se establecen todas las rutas de la app.

const routes: Routes = [
  {
    path: 'login', // Esta ruta tira a login
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup', // Esta ruta tira a signup
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'home', // Esta ruta tira al home cuando ya se hubo registrado un cliente
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '', // La ruta vacia redirecciona a login
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
