import { Component, OnInit } from '@angular/core';

// Services
import {AuxService} from '../services/aux.service';
import {Productor} from '../services/auxClasses/productor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auxService: AuxService) {}

  ngOnInit(){
  }

  loadProductor(productor:Productor){
    this.auxService.productorCargado = productor;
  }

}
