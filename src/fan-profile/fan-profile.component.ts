import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FanProfileService } from './fan-profile.service';

@Component({
  selector: 'app-fan-profile-component',
  templateUrl: './fan-profile.component.html',
  styleUrls: ['./fan-profile.component.css']
})

export class FanProfileComponent implements OnInit {
  public fanProfileService: FanProfileService;
  public fanProfileServiceSubscribe: Subscription;

  public user: any;
  public radioModel: string;

  public constructor(fanProfileService: FanProfileService) {
    this.fanProfileService = fanProfileService;
  }

  public ngOnInit(): void {
    this.radioModel = 'permonth';

    this.fanProfileServiceSubscribe = this.fanProfileService.getUser()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        const user: any[] = res.data;
        this.user = user;
      });
  }
}
