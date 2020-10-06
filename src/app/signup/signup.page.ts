import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';

import {CrPcdService} from 'cr-pcd';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})

export class SignupPage implements OnInit {

  provinces: any;
  cantones: any;
  districts: any;
  provincia: any;
  canton: any;
  distrito: any;

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

}
