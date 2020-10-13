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
  cantidadCarrito:number;
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
      this.cantidad -= this.cantidadCarrito;
    }
  }

  disminuir() {
    if(this.cantidadCarrito <= 0){
      return;
    }
    this.auxService.carrito.find(element => element.producto.id == this.id).cantidad -= 1;
    this.cantidadCarrito -= 1;
    this.cantidad += 1;
  }

  aumentar(){
    if(this.cantidad <= 0){
      return;
    }
    this.auxService.carrito.find(element => element.producto.id == this.id).cantidad += 1;
    this.cantidadCarrito += 1;
    this.cantidad -= 1;
  }

}
