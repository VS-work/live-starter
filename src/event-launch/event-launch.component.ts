import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { mergeMap, combineAll } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { FileItem } from 'ng2-file-upload';
import { ToastOptions, ToastyService } from 'ng2-toasty';

import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { FileConfig } from '../shared/file-uploader/fileUploader.interface';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';
import { FieldConfig } from '../shared/multiple-inputs/fieldConfig.interface';
import { User, UserManagementService } from '../shared/services/user-management-service';
import { EventInfo } from '../shared/event-info/event-info.interface';
import { NewStreamModel } from '../shared/wowza-streaming-cloud/new-stream.model';
import { Pattern, CrowdcampaignForSomeOtherArtist, CrowdcampaignForMySelf, CrowdCampaignType } from '../enums';
import { OembedService } from '../shared/services';
import { ShowManagementService, LinkWithEmbedCode, Show } from '../shared/services/show-management-service';

@Component({
  selector: 'app-launch-component',
  templateUrl: './event-launch.component.html',
  styleUrls: ['./event-launch.component.scss']
})
export class LaunchComponent implements OnInit {
  @ViewChild(FileUploaderComponent) posterUploader: FileUploaderComponent;
  @ViewChild('evtHashtags') evtHashtags: NgForm;
  userProfile: User;
  funded = 0;
  activeStep = 1;
  isValidTimePicker = true;
  minDate: Date = new Date();
  bsValue: Date = new Date();
  timePerformance = {
    start: new Date(),
    end: new Date(),
  };
  wowzaObj = new NewStreamModel();
  uploaderImgs: FileItem[] = [];
  posterConfig: FileConfig = {
    isMultiple: false,
    acceptTypes: '.png, .jpg, .jpeg, .gif, .svg',
    labelText: 'Upload poster',
    name: 'poster',
    error: {
      message: 'Please choose poster',
      isShow: false
    }
  };
  embedVideoConfig: FieldConfig = {
    label: 'Embed videos',
    errorMsg: `Field is not valid! You can use only Youtube and Vimeo links`,
    embedPattern: Pattern.YoutubeOrVimeoUrl
  };
  embedAudioConfig: FieldConfig = {
    label: 'Embed audios',
    errorMsg: `Field is not valid! You can use only SoundCloud link`,
    embedPattern: Pattern.SoundCloudUrl
  };
  eventInfo: EventInfo;
  launchEvent: Show = new Show();
  audios: string[] = [];
  videos: string[] = [];
  crowdcampaignForSomeOtherArtist: CrowdCampaignType = CrowdcampaignForSomeOtherArtist;
  crowdCampaignTypes: CrowdCampaignType[] = [CrowdcampaignForMySelf, CrowdcampaignForSomeOtherArtist];
  checkedCrowdCampaignType: CrowdCampaignType = CrowdcampaignForMySelf;
  hashtags = '';
  patterns = Pattern;

  constructor(private router: Router,
              private showManagementService: ShowManagementService,
              private wowzaCloudService: WowzaCloudService,
              private toastyService: ToastyService,
              private oembedService: OembedService,
              private userManagementService: UserManagementService) {
  }

  ngOnInit(): void {
    this.userProfile = this.userManagementService.getUserFromLocalStorage();

    this.userManagementService.updateUserAccount
      .subscribe(() => {
        this.userProfile = this.userManagementService.getUserFromLocalStorage();
      });

    this.checkFreeEvent();

    this.changeCrowfundingType(this.checkedCrowdCampaignType);
  }

  isActiveStep(step: number): boolean {
    return this.activeStep === step;
  }

  goToNextStep(eventForm: NgForm): void | undefined {
    if (eventForm.invalid) {
      const toastOptions: ToastOptions = {...customToastOptions, ...{title: 'Error', msg: 'Form is not valid'}};
      this.toastyService.error(toastOptions);
      return undefined;
    }

    this.launchEvent.creator = this.userProfile._id;
    this.activeStep += 1;

    if (this.activeStep === 2) {
      this.setEventInfo();
    }
  };

  goBack(): void {
    this.activeStep = this.activeStep === 1 ? 1 : this.activeStep - 1;
  }

  setEventInfo(): void {
    this.eventInfo = {
      artistId: this.launchEvent.creator,
      showHashtags: this.launchEvent.hashtags,
      tickets: this.launchEvent.tickets
    };
  }

  publish(eventFormStep2: NgForm): void | undefined {
    this.validateTimePickers();
    this.posterConfig.error.isShow = !this.posterUploader.uploader.queue.length;

    if (eventFormStep2.invalid && this.isValidTimePicker || !this.posterUploader.uploader.queue.length) {
      const toastOptions: ToastOptions = {...customToastOptions, ...{title: 'Error', msg: 'Form is not valid'}};
      this.toastyService.error(toastOptions);
      return undefined;
    }

    const parsedAudioLinksToEmbedCode = this.parseLinkToEmbedCode(this.audios)
      .subscribe(res => {
        this.launchEvent.audios = res;
      });

    const parsedVideoLinksToEmbedCode = this.parseLinkToEmbedCode(this.videos)
      .subscribe(res => {
        this.launchEvent.videos = res;
      });

    this.wowzaObj.name = this.launchEvent.name;
    this.launchEvent.timePerformance.start = this.showManagementService.getDateAccordingToTimeZone({date: this.timePerformance.start});
    this.launchEvent.timePerformance.end = this.showManagementService.getDateAccordingToTimeZone({date: this.timePerformance.end});
    this.launchEvent.datePerformance = new Date(this.launchEvent.timePerformance.start).getTime();
    this.launchEvent.dateCreated = new Date().getTime();

    const newLiveSreamWowza = this.wowzaCloudService.newLiveStream(this.wowzaObj)
      .pipe(
        mergeMap(res => {
          this.launchEvent.wowza.id = res.id;

          return this.showManagementService.saveNewEvent(this.launchEvent);
        }),
      )
      .subscribe(res => {
        this.posterUploader.sendFiles(res.newId);
        this.router.navigate(['events']);
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  setEncoder(encoder: string): void {
    this.wowzaObj.encoder = encoder;
  }

  validateTimePickers(): void {
    this.isValidTimePicker = this.timePerformance.start.getTime() <= this.timePerformance.end.getTime();
  }

  changeDate(date: Date): void {
    const startHrs = this.timePerformance.start.getHours();
    const startMinutes = this.timePerformance.start.getMinutes();
    const endHrs = this.timePerformance.end.getHours();
    const endMinutes = this.timePerformance.end.getMinutes();

    this.timePerformance = {
      start: new Date(date.toISOString()),
      end: new Date(date.toISOString())
    };

    this.timePerformance.start.setHours(startHrs, startMinutes, 0, 0);
    this.timePerformance.end.setHours(endHrs, endMinutes, 0, 0);

    this.validateTimePickers();
  }

  setTemporaryPosters(posters: FileItem[]): void {
    this.uploaderImgs = posters;
  }

  setVideosArr(videos: string[]): void {
    this.videos = videos;
  }

  setAudiosArr(audios: string[]): void {
    this.audios = audios;
  }

  parseLinkToEmbedCode(links: string[]): Observable<LinkWithEmbedCode[]> {
    const arrayOfObservableWithParsedLink = links.map(link => {
      return this.oembedService.getEmbedCode(link)
    });

    const concatedObservable = of(...arrayOfObservableWithParsedLink);

    return concatedObservable.pipe(combineAll());
  }

  checkFreeEvent(): void | undefined {
    const tickets = {
      count: !this.launchEvent.isFree ? 50 : 0,
      ticketPrice: !this.launchEvent.isFree ? 10 : 0,
      ticketsToFund: 0
    };

    this.launchEvent.tickets = {
      ...this.launchEvent.tickets,
      ...tickets
    }
  }

  changeCrowfundingType(crowdCampaignType: CrowdCampaignType): void | undefined {
    if (crowdCampaignType !== this.crowdcampaignForSomeOtherArtist) {
      this.launchEvent.artist = this.userProfile.username;

      return undefined;
    }

    this.launchEvent.artist = '';
  }

  convertHashtagsToList(evtHashtags: NgForm): void | undefined {
    this.hashtags = this.hashtags.trim();

    if (evtHashtags.invalid) {
      return undefined;
    }

    this.launchEvent.hashtags = this.hashtags
      .trim()
      .split(' ');
  }
}
