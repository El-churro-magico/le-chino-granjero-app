import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';

@Injectable({
  providedIn: 'root'
})

export class AuxService {

  productores:Productor[] = [
    {name:'Chino Yock',
    distrito:10101,
    score:5,
    productos:[],
    imgUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1638864012%2F1234944579597_f.jpg&f=1&nofb=1'}
  ];

  productorCargado: Productor = null;
  productosCargados: Producto[] = [];

  carrito: {
    producto:Producto,
    cantidad:number
  }[] = [];

  notificaciones:{
    productor:Productor,
    score: number
  }[] = [{productor:new Productor(), score:1}];
  location:number = 20101;
  token:String = '';

  constructor() { }


}
