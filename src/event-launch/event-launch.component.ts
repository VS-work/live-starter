import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { mergeMap, combineAll, combineLatest } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import { ToastOptions, ToastyService } from 'ng2-toasty';

import { SearchService, LocalStorageService } from '../shared';
import { EventService } from './event.service';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { MultipleGenres } from './multipleGenres.interface';
import { FileConfig } from '../shared/file-uploader/fileUploader.interface';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';
import { FieldConfig } from '../shared/multiple-inputs/fieldConfig.interface';
import { User } from '../user-service/user.model';
import { EventInfo } from '../shared/event-info/event-info.interface';
import { NewStreamModel } from '../shared/wowza-streaming-cloud/new-stream.model';
import { LocationService } from '../shared/servises';
import { Country } from '../shared/models';
import { Pattern } from '../enums';
import { OembedService } from '../shared/servises/oembed/oembed.service';
import { LinkWithEmbedCode, Show } from '../shared/show-service/show.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-launch-component',
  templateUrl: './event-launch.component.html',
  styleUrls: ['./event-launch.component.scss']
})
export class LaunchComponent implements OnInit, OnDestroy {
  @ViewChild(FileUploaderComponent) posterUploader: FileUploaderComponent;
  userProfile: User;
  funded = 0;
  genres: MultipleGenres[] = [];
  locations: Country[];
  activeStep = 1;
  eventServiceSubscribe: Subscription;
  searchServiceSubscribe: Subscription;
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

  constructor(private router: Router,
              private searchService: SearchService,
              private userProfileService: LocalStorageService,
              private eventService: EventService,
              private wowzaCloudService: WowzaCloudService,
              private toastyService: ToastyService,
              private locationService: LocationService,
              private oembedService: OembedService) {
  }

  ngOnInit(): void {
    const userProfile = this.userProfileService.getItem('profile');

    if (userProfile) {
      this.setUserInfo(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.setUserInfo(userData.value);
    });

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe(res => {
        this.genres = res.map((genre: string) => ({isChecked: false, value: genre}));
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.searchServiceSubscribe = this.locationService.getCountries()
      .subscribe(res => {
        this.locations = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.checkFreeEvent();
  }

  setUserInfo(profile: string) {
    try {
      this.userProfile = new User(JSON.parse(profile));
    } catch (e) {
      console.error('something went wrong: ', e);
    }
  }

  ngOnDestroy() {

  }

  isActiveStep(step: number): boolean {
    return this.activeStep === step;
  }

  goToNextStep(eventForm: NgForm): void | undefined {
    this.launchEvent.genres = this.genres.filter(genre => genre.isChecked).map(genre => genre.value);
    if (eventForm.invalid || !this.launchEvent.genres.length) {
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
      showLocation: this.launchEvent.location.country,
      artistId: this.launchEvent.creator,
      showGenres: this.launchEvent.genres,
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
    this.launchEvent.timePerformance.start = moment(this.timePerformance.start).format('dddd, MMMM DD YYYY, h:mm:ss a');
    this.launchEvent.timePerformance.end = moment(this.timePerformance.end).format('dddd, MMMM DD YYYY, h:mm:ss a');

    const newLiveSreamWowza = this.wowzaCloudService.newLiveStream(this.wowzaObj)
      .pipe(
        mergeMap(res => {
          this.launchEvent.wowza.id = res.id;

          return this.eventService.saveNewEvent(this.launchEvent);
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
    this.launchEvent.datePerformance = date.getTime();
    const startHrs = this.timePerformance.start.getHours();
    const startMinutes = this.timePerformance.start.getMinutes();
    const endHrs = this.timePerformance.end.getHours();
    const endMinutes = this.timePerformance.end.getMinutes();

    this.timePerformance = {
      start: new Date(date.toISOString()),
      end: new Date(date.toISOString())
    };

    this.timePerformance.start.setHours(startHrs);
    this.timePerformance.start.setMinutes(startMinutes);
    this.timePerformance.start.setSeconds(0);
    this.timePerformance.end.setHours(endHrs);
    this.timePerformance.end.setMinutes(endMinutes);
    this.timePerformance.end.setSeconds(0);
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
}
