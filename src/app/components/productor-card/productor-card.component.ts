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

export class ProductorCardComponent{
  @Input() name:string;
  @Input() score:number;
  @Input() imgUrl:String;
  @Input() productor:number;

  constructor(
    private router: Router,
    private auxService: AuxService
  ) {}

  goToProductor(){
    this.auxService.productorCargado = this.auxService.productores.find(productor => productor.id == this.productor);
    this.router.navigate(['/home/productor']);
  }
}
