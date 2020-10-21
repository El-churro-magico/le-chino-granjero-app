import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login.page';

// Para login no hay rutas, solo la principal

const routes: Routes = [
  {
    path: '',
    component: LoginPage,  // carga el componente de LoginPage en esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
