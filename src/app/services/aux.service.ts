import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuxService {

  productores = [];
  productos = []
  carrito = [];
  notificaciones = [
    {productor:'Chino Yock'}
  ];
  location = 20101;
  token = '';

  constructor() { }

  setProductores(){
    this.productores = {papa:'pollo'};
    console.log(this.productores);
  }


}
