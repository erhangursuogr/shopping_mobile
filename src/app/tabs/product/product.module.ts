import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductPage } from './product.page';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductPipe } from './pipes/product.pipe';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //BrowserAnimationsModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage, ProductPipe]
})
export class ProductPageModule {}
