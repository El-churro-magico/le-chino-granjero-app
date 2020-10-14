import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';
import {Profile} from './auxClasses/profile';

@Injectable({
  providedIn: 'root'
})

export class AuxService {

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
    productor:Productor,
    score: number
  }[] = [];
  location:number = 20101;
  token:String = '';
  profile:Profile;
  constructor() { }


}
