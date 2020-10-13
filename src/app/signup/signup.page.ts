import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';

import {CrPcdService} from 'cr-pcd';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})

export class SignupPage implements OnInit {

  // Para los cantones, provincias, distrito
  provinces: any;
  cantones: any;
  districts: any;
  provincia: any;
  canton: any;
  district: any;

  nombre: string;
  apellido: string;
  cedula: string;
  numero: string;
  fecha: string;
  usuario: string;
  contrasena: string;
  direccion: string;

  constructor(
    private crPcd: CrPcdService,
    private cdr: ChangeDetectorRef
  ){
    this.provinces = [];
    this.cantones = [];
    this.districts = [];
  }

  changedProvincia(){
    const cantonesObj = this.crPcd.getCantons(this.provincia);
    console.log(cantonesObj);

    this.cantones = [];
    this.districts = [];
    let i = this.provincia*100 + 1;
    while (cantonesObj[i] != undefined) {
      const element = cantonesObj[i];
      this.cantones.push({i,element});
      i = i+1;
    }
  }

  changedCanton(){
    const districtObj = this.crPcd.getDistricts(this.canton);
    this.districts = [];
    console.log(districtObj);

    let i = this.canton*100 + 1;
    while (districtObj[i] != undefined) {
      const element = districtObj[i];
      this.districts.push({i,element});
      i = i+1;
    }
    console.log(this.districts);

  }

  changedDistrict(){

  }

  async ngOnInit(){
    const provincesObj = this.crPcd.getProvinces();
    for (let i = 1; i < 8; i++) {
      const element = provincesObj[i];
      this.provinces.push({i,element});
    }
    console.log(this.provinces);

  }

  // Aqui se realiza el request al papi, tiene que ser async
  async requestpapi(){
    console.log('requesting');

    const data = {
      nombre:this.nombre,
      apellido:this.apellido,
      cedula:this.cedula,
      numero:this.numero,
      address:this.direccion,
      fecha:this.fecha,
      usuario:this.usuario,
      contrasena:this.contrasena,
      provincia:this.crPcd.getProvinces()[this.provincia],
      canton:this.crPcd.getCantons(this.provincia)[this.canton],
      distrito:this.crPcd.getDistricts(this.canton)[this.district]
    };
    console.log(data);


    // Usamos el API Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    /*
    const response = await fetch('https://192.168.0.107:44371/api/Client',{
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }); // Aqui especificamente se hace la request
    const myJson = await response.json(); // Este es el resultado del papi
    console.log(myJson);*/
  }

}
