import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchResultComponent } from './search-result.component';
import { routing } from '../modules/search-result.routing';
import { SearchService } from '../shared/search-service';
import { ShowInfoModule } from '../shared/show-info/show-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ShowInfoModule
  ],
  providers: [SearchService],
  declarations: [SearchResultComponent]
})

export class SearchResultModule {
}
