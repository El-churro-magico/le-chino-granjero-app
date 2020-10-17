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

export class LoginPage
{
  usuario:string;
  password:string;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auxService: AuxService,
    private http: HttpClient,
    private nativeHttp: HTTP,
    private plt: Platform
  ) {}

  signup(){
    this.router.navigate(['/signup']);
    console.log("A");
  }

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
         this.auxService.location=this.auxService.locationNumber(this.auxService.profile.province,this.auxService.profile.canton,this.auxService.profile.district)
         this.usuario='';
         this.password='';
         this.router.navigate(['/home']);
       })
    })
  }

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
