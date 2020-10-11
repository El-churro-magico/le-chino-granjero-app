import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'producto-card',
  templateUrl: 'producto-card.component.html',
  styleUrls: ['producto-card.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule ]
})

export class ProductoCardComponent{
  @Input() cantidad:number;
  @Input() id:number;
  @Input() price:number;
  @Input() name:string;
  @Input() cantidadCarrito:number;
  @Input() imgUrl:string;
  constructor(
  ) {}

}
