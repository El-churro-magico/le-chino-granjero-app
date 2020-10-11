import { Component, OnInit } from '@angular/core';

// Services
import {AuxService} from '../services/aux.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auxService: AuxService) {}

  ngOnInit(){
    this.auxService.isThisWorking();
  }

}
