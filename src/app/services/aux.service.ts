import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';
import {Profile} from './auxClasses/profile';
import {CrPcdService} from 'cr-pcd';
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
    address:null,
    sinpeN:null,
    score:5,
    productos:[
      {
        id:1,
        name:'Berenjena',
        price:500,
        quantity: 100,
        imgUrl: 'https://i.imgur.com/3a2bLpm.jpeg'
      }
    ],
    imgUrl:'https://i.imgur.com/FgDrs7o.jpg'}
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
