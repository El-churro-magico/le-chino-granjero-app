import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { ProfilePage } from './profile/profile.page';
import { ProductorPage } from './productor/productor.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProductorCardComponent } from '../components/productor-card/productor-card.component';
import { HeaderComponent } from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {ProductoCardComponent} from '../components/producto-card/producto-card.component';
import {CarritoCardComponent} from '../components/footer/carrito-card/carrito-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ProfilePage,
    ProductorPage,
    ProductorCardComponent,
    HeaderComponent,
    FooterComponent,
    ProductoCardComponent,
    CarritoCardComponent
  ]
})
export class HomePageModule {}
