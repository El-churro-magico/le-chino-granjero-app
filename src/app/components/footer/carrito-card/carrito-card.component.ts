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
/** Esta clase representa cada elemento del carrito*/
export class CarritoCardComponent implements OnInit{
  @Input() imgUrl:string;  // La imagen
  @Input() cantidad:number; // La cantidad
  @Input() price:number; // El precio
  @Input() name:string; // El nombre
  @Input() id:number; // El id
  productor:String; // El productor al que pertenece

  constructor(
    private auxService: AuxService
  ) {}

  /** Metodo que se ejecuta al inicializar el componente,
  * se encarga de vincular el productor con el producto actual
  */
  ngOnInit(){
    this.productor = this.auxService.productores.find(
      productor=>productor.productos.find(
        producto=>producto.id==this.id
      )
    ).name;
  }
  /**Método encargado de disminuir la cantidad de este producto en el carrito*/
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

  /** Metodo encargado de aumentar la cantidad de este producto en el carrito*/
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

  /**Metodo encargado de eliminar el producto del carrito*/
  dismiss(){
    this.auxService.carrito = this.auxService.carrito.filter(
      element=>element.producto.id!=this.id
    )
  }

}
