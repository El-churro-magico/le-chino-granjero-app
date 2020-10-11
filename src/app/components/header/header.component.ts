import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {CrPcdService} from 'cr-pcd';

import {AuxService} from '../../services/aux.service';

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
  newNotification = false;
  notification = false;
  specificNotification = false;
  listNotification = false;
  location = ""
  constructor(
    private auxService: AuxService,
    private crPcd: CrPcdService
  ) {}

  ngOnInit(){
    const distrito = this.crPcd.getDistricts(Math.floor(this.auxService.location/100))[this.auxService.location];
    const canton = this.crPcd.getCantons(Math.floor(this.auxService.location/10000))[Math.floor(this.auxService.location/100)];
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
  }
}
