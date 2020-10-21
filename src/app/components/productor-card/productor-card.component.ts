import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {AuxService} from '../../services/aux.service';
import {Productor} from '../../services/auxClasses/productor';

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

/**
* Clase encargada de representar las cards de los productores de un distrito.
*/
export class ProductorCardComponent{
  @Input() name:string; // Nombre del productor
  @Input() score:number; // Score del productor
  @Input() imgUrl:String; // Imagen del productor
  @Input() productor:number; // Id del productor

  constructor(
    private router: Router,
    private auxService: AuxService
  ) {}

  /** Método que redirecciona a la página del productor */
  goToProductor(){
    this.auxService.productorCargado = this.auxService.productores.find(productor => productor.id == this.productor);
    this.router.navigate(['/home/productor']);
  }
}
