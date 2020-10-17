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

  ipAddress: string="25.83.43.98";
  port: string="1234";
  productores:Productor[];

  productorCargado: Productor;

  carrito: {
    producto:Producto,
    cantidad:number
  }[]=[];

  notificaciones:{
    productor:number,  // id del productor
    score: number,
    id:number
  }[]=[];
  location:number;
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
    this.productores = null;
    this.productorCargado = null;
    this.carrito = null;
    this.notificaciones = null;
    this.location =null;
    this.token = null;
  }


}
