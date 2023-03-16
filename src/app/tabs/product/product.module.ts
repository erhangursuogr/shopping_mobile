import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductPage } from './product.page';
import { ProductPageRoutingModule } from './product-routing.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //BrowserAnimationsModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
