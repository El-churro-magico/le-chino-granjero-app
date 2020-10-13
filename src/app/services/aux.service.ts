import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';
import {User} from './auxClasses/user';

@Injectable({
  providedIn: 'root'
})

export class AuxService {

  usuarioCargado: User={
    username:'cvaz',
    nombre: 'Chino Yock',
    fechaNacimiento:'3/12/2020',
    telefono:'0000 0000',
    cedula:'1 1111 1111',
    direccion: 'Del palo de mango, 500mts al norte'
  };

  productores:Productor[] = [
    {name:'Chino Yock',
    id:111111111,
    distrito:10101,
    score:5,
    productos:[
      {
        id:1,
        name:'Berenjena',
        price:500,
        quantity: 100,
        imgUrl: 'https://images.pexels.com/photos/5187377/pexels-photo-5187377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      }
    ],
    imgUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1638864012%2F1234944579597_f.jpg&f=1&nofb=1'}
  ];

  productorCargado: Productor = null;

  carrito: {
    producto:Producto,
    cantidad:number
  }[] = [
    {
      producto:{
        id:1,
        name:'Berenjena',
        price:500,
        quantity: 100,
        imgUrl: 'https://images.pexels.com/photos/5187377/pexels-photo-5187377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      },
      cantidad: 4
    }
  ];

  notificaciones:{
    productor:number,  // id del productor
    score: number
  }[] = [
    {productor:111111111,score: 1}
  ];
  location:number = 20101;
  token:String = '';

  constructor() { }

  limpiar(){
    this.usuarioCargado = null;
    this.productores = null;
    this.productorCargado = null;
    this.carrito = null;
    this.notificaciones = null;
    this.location =null;
    this.token = null;
  }


}
