import { Component, OnInit } from '@angular/core';

import { GetFAQsService } from './faq.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-faq-component',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

export class FAQComponent implements OnInit {
  public getFAQDada: GetFAQsService;
  public getFAQDataSubcribe: Subscription;
  public faqs: any[];

  public constructor(getFAQDada: GetFAQsService) {
    this.getFAQDada = getFAQDada;
  }

  public ngOnInit(): void {

    this.getFAQDataSubcribe = this.getFAQDada.getQsData()
      .subscribe((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }

      this.faqs = res.data;
    });
  }
}
