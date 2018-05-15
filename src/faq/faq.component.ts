import { Component, OnInit } from '@angular/core';

import { Faq, GetFAQsService } from './faq.service';

@Component({
  selector: 'app-faq-component',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

export class FAQComponent implements OnInit {
  faqs: Faq[] = [];

  constructor(private getFAQDada: GetFAQsService) {
  }

  ngOnInit() {
    const getFAQDataSubcribe$ = this.getFAQDada.getQsData();

    getFAQDataSubcribe$
      .subscribe(res => {
        this.faqs = res;
      }, err => {
        console.error('something went wrong: ', err);
      });
  }
}
