import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';
import {Profile} from './auxClasses/profile';

import {CrPcdService} from 'cr-pcd';

@Injectable({
  providedIn: 'root'
})

export class AuxService {

  productores:Productor[] = [
    {name:'Chino Yock',
    id:111111111,
    distrito:10101,
    address:null,
    sinpeN:null,
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
  constructor(private crPcd: CrPcdService) { }

  locationNumber(provincia:String, canton:String, distrito:String){
    const provincias = this.crPcd.getProvinces();
    let provinciaNum:number = 0;
    let i:number = 1;
    // Get provincia
    console.log(provincia);
    console.log(provincias);
    while(provincias[i] != undefined){
      if(provincias[i] == provincia){
        provinciaNum = i;
      }
      i+=1;
    }
    // Get canton
    const cantones:number = this.crPcd.getCantons(provinciaNum.toString());
    console.log(cantones);
    console.log(provinciaNum.toString());


    let cantonNum:number =0;
    i = provinciaNum*100+1;
    while(cantones[i]!=undefined){
      if(cantones[i] == canton){
        cantonNum = i;
      }
      i+=1;
    }
    // Get district
    const distritos:number = this.crPcd.getDistricts(cantonNum.toString());
    let distritoNum:number = 0;
    i = cantonNum*100+1;
    while(distritos[i]!=undefined){
      if(distritos[i]==distrito){
        distritoNum = i;
      }
      i+=1;
    }
    return distritoNum;
  }


}
