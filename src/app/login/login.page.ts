import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, Platform} from '@ionic/angular';
import {AuxService} from '../services/aux.service';

import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})


/** Pagina de login*/
export class LoginPage
{
  usuario:string; // Usuario
  password:string; // Contraseña

  /**
  * Definimos un router para redireccionar a otras paginas,
  * alertController para lanzar alertas y auxService para hacer uso del servicio
  */
  constructor(
    private router: Router,
    private alertController: AlertController,
    private auxService: AuxService
  ) {}

  /** Se ejecuta al presionar el signup, redirecciona a signup*/
  signup(){
    this.router.navigate(['/signup']);
    console.log("A");
  }

  /** Se ejecuta al presionar login, envia las solicitudes necesarias al REST
  *  para guardar los datos que se requieren dentro del servicio, como lo son:
  *  perfil del cliente y productores cercanos.
  */
  async login()
  {
    console.log('PECHA');
    if(!(this.usuario==""||this.password==""))
    {
      var alert;
      console.log(this.usuario+"\n"+this.password);
      let data= {password:this.password}
      fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/SignIn/cliente/'+this.usuario,{
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
           // logica aqui
           this.auxService.token = json;
           return this.fetchProfile();
         });
      }).catch(async (error) => {  // Agarran los errores
          alert = await this.alertController.create({
          header: 'Alert',
          message:'Error: El usuario o contrasena proporcionado es incorrecto!',
          buttons:['Ok']
        })
        await alert.present();
        console.log(error);
      })
    }
  }

  /** Lo utilizamos para traer el perfil del cliente desde la base de datos
  * y guardar la información en el registro
  */
  async fetchProfile()
  {
    var alert;
    let data={token:this.auxService.token}
    fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+'/api/Client/getUserByUserName/'+this.usuario,{
      method:'POST',
      mode: 'cors',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response =>{// Maneja los errores
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then((response)=>{
       response.json().then(json=>{
         // logica aqui
         this.auxService.profile = json;
         this.fetchProducersByLocation();

         this.auxService.notificaciones = this.auxService.profile.notifications.map(element=>{
           return {
             productor:element.producerID,
             score:0,
             id: element.ID
           }
         })

         this.auxService.location=this.auxService.locationNumber(this.auxService.profile.province,this.auxService.profile.canton,this.auxService.profile.district)
         this.usuario='';
         this.password='';
         this.router.navigate(['/home']);
       })
    })
  }

  /**
  *  Trae los productores que están en el mismo distrito que el cliente y los guarda
  *  en el servicio.
  */
  async fetchProducersByLocation()
  {
    var alert;

    fetch('http://'+this.auxService.ipAddress+':'+this.auxService.port+"/api/Producer/getProducerByLocation/"+this.auxService.profile.province+"/"+this.auxService.profile.canton+"/"+this.auxService.profile.district,{
      method:'GET',
      mode: 'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response =>{// Maneja los errores
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then((response)=>{
       response.json().then(json=>{
         // logica aqui
         this.auxService.productores=json.map(element=>{
           return {
             name: element.businessName,
             address: element.address,
             sinpeN:element.sinpeN,
             id:element.cedula,
             distrito:element.district,
             score:element.calification,
             imgUrl:element.image,
             productos:element.products.map(product=>{
               return{
                 id:product.id,
                 name:product.name,
                 price:product.cost,
                 category:product.category,
                 quantity:product.inStock,
                 imgUrl:product.image
               };
             })
           };
         })
         json;
         console.log(this.auxService.productores);
       })
    })
  }
}
