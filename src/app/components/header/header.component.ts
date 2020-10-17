import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {CrPcdService} from 'cr-pcd';

import {AuxService} from '../../services/aux.service';

import {Productor} from '../../services/auxClasses/productor'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})

export class HeaderComponent implements OnInit{
  star1 = false;
  star2 = false;
  star3 = false;
  star4 = false;
  star5 = false;
  newNotification = false;
  notification = false;
  specificNotification = false;
  listNotification = false;
  location = "";
  calificando:{
    productor: number,
    score: number,
    id:number
  };
  constructor(
    private auxService: AuxService,
    private crPcd: CrPcdService
  ) {}

  ngOnInit(){
    const distrito = this.crPcd.getDistricts(Math.floor(this.auxService.location/100).toString())[this.auxService.location];
    const canton = this.crPcd.getCantons(Math.floor(this.auxService.location/10000).toString())[Math.floor(this.auxService.location/100)];
    const provincia = this.crPcd.getProvinces()[Math.floor(this.auxService.location/10000)];
    this.location = provincia + ', ' + canton + ', ' + distrito;
  }
  showNotif(){
    this.notification = true;
    this.listNotification = true;
  }
  hideNotif(){
    this.notification = false;
    this.listNotification = false;
    this.specificNotification = false;
  }
  calificar(noti){
    this.listNotification = false;
    this.specificNotification = true;
    this.calificando = {productor:noti.productor, score:1, id:noti.id};

  }
  submitCalificacion(){
    console.log('Enviar al rest api calificacion de '+this.calificando.score+' a '+this.calificando.productor);

    let data= {}
    fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/Producer/Rate/'+this.calificando.score+'/'+this.calificando.productor+'/'+this.calificando.id,{
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response =>{// Maneja los errores
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(async (response)=>{
       response.json().then((json)=>{
         this.star1 = false;
         this.star2 = false;
         this.star3 = false;
         this.star4 = false;
         this.star5 = false;

         this.auxService.notificaciones = this.auxService.notificaciones.filter(
           element => element.productor!=this.calificando.productor
         );

         this.calificando = null;
         this.notification = false;
         this.listNotification = false;
         this.specificNotification = false;
       });
    }).catch(async (error) => {  // Agarran los errores

      console.log(error);
    })


  }
  dismissNotification(noti){
    this.auxService.notificaciones = this.auxService.notificaciones.filter(
      element => element.productor!=this.calificando.productor
    );
  }
  searchProductorById(id:number){
    return this.auxService.productores.find(element=>element.id==id);
  }
  // Metodos para las estrellas
  star1C = ()=>{
    this.star1 = true;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
    this.calificando.score = 1;
  }
  star2C = ()=>{
    this.star1 = true;
    this.star2 = true;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
    this.calificando.score = 2;
  }
  star3C = ()=>{
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = false;
    this.star5 = false;
    this.calificando.score = 3;
  }
  star4C = ()=>{
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = false;
    this.calificando.score = 4;
  }
  star5C = ()=>{
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = true;
    this.calificando.score = 5;
  }
}
