import { NgModule, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import {AuxService} from '../../../services/aux.service';

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

export class CarritoCardComponent implements OnInit{
  @Input() imgUrl:string;
  @Input() cantidad:number;
  @Input() price:number;
  @Input() name:string;
  @Input() id:number;
  productor:String;

  constructor(
    private auxService: AuxService
  ) {}

  ngOnInit(){
    this.productor = this.auxService.productores.find(
      productor=>productor.productos.find(
        producto=>producto.id==this.id
      )
    ).name;
  }

  disminuir(){
    if(this.cantidad <=0){
      return
    }
    const productoCarrito = this.auxService.carrito.find(
      element=>element.producto.id==this.id
    );
    productoCarrito.cantidad -= 1;
    productoCarrito.producto.quantity +=1;

  }

  aumentar(){

    const productoCarrito = this.auxService.carrito.find(
      element=>{console.log(element.producto);
      return element.producto.id==this.id}
    );
    if(productoCarrito.producto.quantity<=0){
      return
    }
    productoCarrito.cantidad += 1;
    productoCarrito.producto.quantity -=1;
  }

  dismiss(){
    this.auxService.carrito = this.auxService.carrito.filter(
      element=>element.producto.id!=this.id
    )
  }

}
