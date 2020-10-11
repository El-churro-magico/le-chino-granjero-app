import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})

export class FooterComponent{

  showDrawer = false;
  uploadRecipe = false;

  constructor(
    private router: Router
  ) {}

  tienda(){
    this.router.navigate(['/home']);
  }

  hideCarrito(){
    this.showDrawer = false;
    this.uploadRecipe = false;
  }

  carrito(){
    this.showDrawer = true;
  }

  profile(){
    this.router.navigate(['/home/profile'])
  }

}
