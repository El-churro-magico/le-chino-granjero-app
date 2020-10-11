import { Component, OnInit, Input } from '@angular/core';

import {AuxService} from '../../services/aux.service'

import {Productor} from '../../services/auxClasses/productor';

@Component({
  selector: 'app-productor',
  templateUrl: 'productor.page.html',
  styleUrls: ['productor.page.scss'],
})

export class ProductorPage implements OnInit {

  productor: Productor;

  constructor(
    private auxService: AuxService
  ) {}

  ngOnInit(){
    this.productor = this.auxService.productorCargado;
    console.log(this.auxService.productorCargado.name);
  }

}
