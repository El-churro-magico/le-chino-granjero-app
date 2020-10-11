import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'carrito-card',
  templateUrl: 'carrito-card.component.html',
  styleUrls: ['carrito-card.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})

export class CarritoCardComponent{
  constructor() {}
}
