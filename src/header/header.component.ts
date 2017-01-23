import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	@Output('user')
	public user: EventEmitter<any> = new EventEmitter<any>();

	public currentUser: any = {};
  public menuItems: any[] = ['Artists', 'Genres', 'How it works', 'Fund', 'Blog', 'Contact'];

	public getUser(options: any): void {
		this.currentUser = options;
		this.user.emit(options);
  }
}
