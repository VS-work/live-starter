import { Component } from '@angular/core';
import { Config } from '../../app.config';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {

  public gotoElement(e: MouseEvent, id: string): void {
    this.scrollTop(e, id);
  }

  public scrollTop(e: MouseEvent, id: string): void {
    e.preventDefault();
    Config.animateScroll(id, 10, 200);
  };
}
