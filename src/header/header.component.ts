import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  public title: string = 'LiveStarter Logo';
  public menuItems: any[] = ['Artists', 'Genres', 'How it works', 'Fund', 'Blog', 'Contact'];

  public signUp(): void {
    console.log('Open sign up popup');
  }
}
