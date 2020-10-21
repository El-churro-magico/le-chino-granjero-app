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

/**Clase que se encarga de representar una card de los productos de un productor*/
export class ProductoCardComponent implements OnInit{
  @Input() cantidad:number; // La cantidad de producto disponible
  @Input() id:number; // El id del producto
  @Input() price:number; // El precio del producto
  @Input() name:string; // El nombre del producto
  cantidadCarrito:number; // La cantidad de producto que hay en el carrito del cliente
  @Input() imgUrl:string; // La imagen del producto
  constructor(
    private auxService: AuxService
  ) {}

  /**
  * Metodo ejecutado en la inicialización del componente, se encarga de cargar los productos
  * y actualizar la cantidad de producto en el carrito
  */
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

  /** Disminuye la cantidad de producto en el carrito */
  disminuir() {
    if(this.cantidadCarrito <= 0){
      return;
    }
    this.auxService.carrito.find(element => element.producto.id == this.id).cantidad -= 1;
    this.cantidadCarrito -= 1;
    this.cantidad += 1;
  }
  /** Aumenta la cantidad de producto en el carrito */
  aumentar(){
    if(this.cantidad <= 0){
      return;
    }else if(!this.auxService.carrito.find(element => {console.log(element);
    return element.producto.id == this.id})){
      this.auxService.carrito.push(
        {
          producto:this.auxService.productores.map(productor =>
            productor.productos.find(producto=>producto.id==this.id)
          ).filter(element=>element!=undefined)[0],
          cantidad:1
        }
      )
    }else{
      this.auxService.carrito.find(element => element.producto.id == this.id).cantidad += 1;
    }
    this.cantidadCarrito += 1;
    this.cantidad -= 1;

  }

}
