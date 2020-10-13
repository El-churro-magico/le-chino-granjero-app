import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';

import {AlertController} from '@ionic/angular';

import {CrPcdService} from 'cr-pcd';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})

export class SignupPage implements OnInit {

  // Para los cantones, provincias, distrito
  ipAddress: string="192.168.86.250";
  port: string="44371";

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
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router
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
  async postClient(){
    console.log('requesting');
    if(!(this.nombre==''||this.apellido==''||this.cedula==''||this.numero==''||this.direccion==''||this.fecha==''||this.usuario==''||this.contrasena==''||this.provincia==null||this.canton==null||this.district==null))
    {
      const data = {
        name:this.nombre,
        lastName:this.apellido,
        cedula:this.cedula,
        phoneN:this.numero,
        address:this.direccion,
        birthDate:this.fecha,
        userName:this.usuario,
        password:this.contrasena,
        province:this.crPcd.getProvinces()[this.provincia],
        canton:this.crPcd.getCantons(this.provincia)[this.canton],
        district:this.crPcd.getDistricts(this.canton)[this.district]
      };
      console.log(data);

      //Usamos el API Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

      var alert;

      fetch('https://'+this.ipAddress+':'+this.port+'/api/Client',{
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
      }).then(async (response)=>{  // Agarran los success
        alert = await this.alertController.create({
          header: 'Alert',
          message:'Usuario creado correctamente!',
          buttons:['Ok']
        });
        await alert.present();
        this.router.navigate(['/login']);  // Asi se navega a otra parte de la app*/
      }).catch(async (error) => {  // Agarran los errores
          alert = await this.alertController.create({
          header: 'Alert',
          message:'Error: La cedula o nombre de usuario proporcionado ya esta registrado!',
          buttons:['Ok']
        })
        await alert.present();
        console.log(error);

        this.nombre = '';
        this.apellido = '';


      });




      /*
      const alert = await this.alertController.create({  // Asi se crea una alerta
        header: 'Alert',
        message: 'Listo pa',
        buttons:['Ok']
      });
      await alert.present();

      this.router.navigate(['/login']);  // Asi se navega a otra parte de la app*/

    }
    else
    {
      const alert= await this.alertController.create({
        header: 'Campos faltantes!',
        message: 'Por favor llene todos los campos correspondientes!',
        buttons:['Ok']
      });
      await alert.present();
    }





  }

}
