import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import { ToastOptions, ToastyService } from 'ng2-toasty';

import { SearchService, LocalStorageService } from '../shared';
import { EventService } from './event.service';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { MultipleGenres } from './multipleGenres.interface';
import { Country } from '../interfaces/country.interface';
import { FileConfig } from '../shared/file-uploader/fileUploader.interface';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';
import { FieldConfig } from '../shared/multiple-inputs/fieldConfig.interface';
import { User } from '../signup/user.class';
import { EventInfo } from '../shared/event-info/event-info.interface';
import { Show } from './event-launch.model';

@Component({
  selector: 'app-launch-component',
  templateUrl: './event-launch.component.html',
  styleUrls: ['./event-launch.component.scss']
})
export class LaunchComponent implements OnInit, OnDestroy {
  @ViewChild(FileUploaderComponent) posterUploader: FileUploaderComponent;
  userProfile: User;
  funded = 0;
  genres: MultipleGenres[];
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
  wowzaObj = {
    aspect_ratio_height: 1080,
    aspect_ratio_width: 1920,
    encoder: 'wowza_gocoder',
    name: ''
  };
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
    errorMsg: `Field is not valid! Try to use "<iframe src=""></iframe>"`,
    embedPattern: '^(<iframe.*? src=")(.*?)(\\??)(.*?)(".*)()(<\\/iframe>)$'
  };
  embedAudioConfig: FieldConfig = {
    label: 'Embed audios',
    errorMsg: `Field is not valid! Try to use "<iframe src=""></iframe>"`,
    embedPattern: '^(<iframe.*? src=")(.*?)(\\??)(.*?)(".*)()(<\\/iframe>)$'
  };
  eventInfo: EventInfo;
  launchEvent: Show = new Show();

  constructor(private router: Router,
              private searchService: SearchService,
              private userProfileService: LocalStorageService,
              private eventService: EventService,
              private wowzaCloudService: WowzaCloudService,
              private toastyService: ToastyService) {}

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
        const styles = res.data;
        this.genres = styles.genres.map((genre: string) => ({isChecked: false, value: genre}));
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.searchServiceSubscribe = this.searchService.getLocations()
      .subscribe(res => {
        this.locations = res.data;
      }, err => {
        console.error('something went wrong: ', err);
      });
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

    this.wowzaObj.name = this.launchEvent.name;
    this.launchEvent.timePerformance.start = moment(this.timePerformance.start).format('dddd, MMMM DD YYYY, h:mm:ss a');
    this.launchEvent.timePerformance.end = moment(this.timePerformance.end).format('dddd, MMMM DD YYYY, h:mm:ss a');

    const newStreamSubscription = this.wowzaCloudService.newStream(this.wowzaObj)
      .subscribe(liveStream => {
        this.launchEvent.wowza.id = liveStream.live_stream.id;
        this.eventServiceSubscribe = this.eventService.saveNewEvent(this.launchEvent)
          .subscribe(res => {
            this.posterUploader.sendFiles(res.newId);
            this.router.navigate(['events']);
          }, err => {
            console.error('something went wrong: ', err);
          });
      }, err => {
        console.log('err start stream', err);
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
    this.launchEvent.videos = videos;
  }

  setAudiosArr(audios: string[]): void {
    this.launchEvent.audios = audios;
  }
}
