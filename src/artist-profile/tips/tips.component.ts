import { Component, Input, OnInit } from '@angular/core';

import forEach from 'lodash-es/forEach'

@Component({
  selector: 'app-tips-tab',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})

export class TipsComponent implements OnInit {
  @Input()
  public currentUser: any;

  public showTips: any[] = [];
  public generalTips: any[] = [];
  public otherTips: any[] = [];

  public ngOnInit(): void {
    forEach(this.currentUser.tips, ((result: any) => {
      if (result.tipTarget === 'show') {
        this.showTips.push(result);
      }

      if (result.tipTarget === 'general') {
        this.generalTips.push(result);
      }

      if (result.tipTarget === 'other') {
        this.otherTips.push(result);
      }
    }));
  }
}

