import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'productor-card',
  templateUrl: 'productor-card.component.html',
  styleUrls: ['productor-card.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule ]
})

export class ProductorCardComponent{
  constructor(
    private router: Router
  ) {}

  goToProductor(){
    this.router.navigate(['/home/productor']);
  }
}
