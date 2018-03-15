import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-pages-header',
  templateUrl: './my-pages-header.component.html',
  styleUrls: ['./my-pages-header.component.scss']
})

export class MyPagesHeaderComponent {
  @Input() isCreateBtnActive = false;
}
