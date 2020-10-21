import { Injectable } from '@angular/core';

import {Productor} from './auxClasses/productor';
import {Producto} from './auxClasses/producto';
import {Profile} from './auxClasses/profile';
import {CrPcdService} from 'cr-pcd';
import {User} from './auxClasses/user';
@Injectable({
  providedIn: 'root'
})

/**
* Un servicio en Angular es una clase que se puede acceder desde cualquier componente
* de la aplicacion, en este caso lo ocupamos para guardar varios atributos necesarios
* y funciones que se ejecutan en varias partes de la aplicacion.
*/
export class AuxService {

  ipAddress: string="192.168.86.250"; // IP adress del RESt
  port: string="1234"; // Puerto del REST
  productores:Productor[];  // Productores cargados en la tienda

  productorCargado: Productor;  // Productor cargado en la página de productor

  carrito: { // El carrito del cliente
    producto:Producto,
    cantidad:number
  }[]=[];

  notificaciones:{  // Las notificaciones del cliente
    productor:number,  // id del productor
    score: number,
    id:number
  }[]=[];
  location:number;  // La ubicacion en su codigo postal
  token:String = ''; // El token de inicio de sesion necesario para autentificar
  profile:Profile; // El perfil cargado
  constructor(private crPcd: CrPcdService) { }

  /**
  * Método que saca el código postal dados una provincia, un canton y un distrito,
  * @param {String} provincia - Nombre de la provincia
  * @param {String} canton - Nombre del canton
  * @param {String} distrito - Nombre del distrito
  */
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

  /** Método encargado de limpiar todo lo guardado en el servicio, funciona más que nada en el cierre de sesión */
  limpiar(){
    this.productores = null;
    this.productorCargado = null;
    this.carrito = null;
    this.notificaciones = null;
    this.location =null;
    this.token = null;
  }


}
