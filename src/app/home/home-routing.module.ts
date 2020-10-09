import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { ProfilePage } from './profile/profile.page';
import { ProductorPage } from './productor/productor.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'tienda',
    redirectTo: ''
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'productor',
    component: ProductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
