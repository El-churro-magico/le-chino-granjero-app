import { NgModule, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {AuxService} from '../../services/aux.service';

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

export class ProductoCardComponent implements OnInit{
  @Input() cantidad:number;
  @Input() id:number;
  @Input() price:number;
  @Input() name:string;
  @Input() cantidadCarrito:number;
  @Input() imgUrl:string;
  constructor(
    private auxService: AuxService
  ) {}

  ngOnInit(){
    const productoCarrito = this.auxService.carrito.find(element => element.producto.id == this.id);
    if(!productoCarrito){
      this.cantidadCarrito = 0;
      console.log(productoCarrito);
    }else{
      this.cantidadCarrito = productoCarrito.cantidad;
    }
  }

  disminuir() {

  }

  aumentar(){

  }

}
