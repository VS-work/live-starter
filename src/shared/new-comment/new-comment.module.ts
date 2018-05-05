import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewCommentComponent } from '../new-comment';

@NgModule({
  imports: [FormsModule],
  declarations: [NewCommentComponent],
  exports: [NewCommentComponent]
})

export class NewCommentModule {
}
