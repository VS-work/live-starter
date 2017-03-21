import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { ShowPageComponent } from './show-page.component';
import { routing } from '../modules/show-page.routing';


@NgModule({
  declarations: [
    ShowPageComponent
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ButtonsModule.forRoot(),
    DropdownModule.forRoot(),
    TooltipModule.forRoot()
  ]
})

export class ShowPageModule {
}
