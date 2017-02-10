import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-tab',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent {
  @Input()
  public currentUser: any;
}

