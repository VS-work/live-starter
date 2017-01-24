import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';
import { SearchComponent, SearchService } from './search';

@NgModule({
  declarations: [
    GenresFilterComponent,
    GenresFilterPipe,
    SearchComponent
  ],
  imports: [
    HttpModule,
    RouterModule,
    CommonModule
  ],
  providers: [SearchService],
  exports: [
    GenresFilterComponent,
    SearchComponent,
    GenresFilterPipe
  ]
})

export class SharedModule {

}
