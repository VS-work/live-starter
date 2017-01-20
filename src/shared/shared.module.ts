import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';

@NgModule({
  declarations: [
	  GenresFilterComponent,
	  GenresFilterPipe
  ],
  imports: [
    HttpModule,
    RouterModule,
    CommonModule
  ],
  providers: [],
  exports: [
  	GenresFilterComponent,
	  GenresFilterPipe]
})

export class SharedModule {

}
