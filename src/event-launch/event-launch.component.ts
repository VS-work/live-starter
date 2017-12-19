import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FileItem } from 'ng2-file-upload';
import * as moment from 'moment';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { User } from 'firebase/app';

import { SearchService, LocalStorageService } from '../shared';
import { EventService } from './event.service';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { LaunchEvent } from './event-launch.interface';
import { MultipleGenres } from './multipleGenres.interface';
import { Country } from '../interfaces/country.interface';
import { FileConfig } from '../shared/file-uploader/fileUploader.interface';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';
import { FieldConfig } from '../shared/multiple-inputs/fieldConfig.interface';

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
  timePerfomance = {
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
  launchEvent: LaunchEvent = {
    name: '',
    creator: '',
    description: '',
    artist: '',
    genres: [],
    posters: [],
    audios: [],
    videos: [],
    appreciations: [],
    info: '',
    live: false,
    completed: false,
    location: {
      country: ''
    },
    dateCreated: Date(),
    datePerformance: moment(new Date()).format('dddd, MMMM DD YYYY'),
    timePerfomance: {
      start: moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a'),
      end: moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a')
    },
    tickets: {
      count: 0,
      ticketPrice: 0,
      ticketsToFund: 0,
      ticketsSold: 0,
      fundedPercentage: 0,
    },
    statistics: {
      likes: [],
      viewers: [],
      followers: []
    },
    wowza: {
      id: null
    }
  };

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
        console.error(err);
      });

    this.searchServiceSubscribe = this.searchService.getLocations()
      .subscribe(res => {
        this.locations = res.data;
      }, err => {
        console.error(err);
      });
  }

  setUserInfo(profile: string) {
    try {
      this.userProfile = JSON.parse(profile);
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy() {

  }

  isActiveStep(step: number): boolean {
    return this.activeStep === step;
  }

  goToNextStep(eventForm: NgForm): void {
    this.launchEvent.genres = this.genres.filter(genre => genre.isChecked).map(genre => genre.value);
    if (eventForm.invalid || !this.launchEvent.genres.length) {
      const toastOptions: ToastOptions = {...customToastOptions, ...{title: 'Error', msg: 'Form is not valid'}};
      this.toastyService.error(toastOptions);
      return;
    }

    this.launchEvent.creator = this.userProfile.email;
    this.activeStep += 1;
  };

  goBack(): void {
    this.activeStep = this.activeStep === 1 ? 1 : this.activeStep - 1;
  }

  publish(eventFormStep2: NgForm): void {
    this.validateTimePickers();
    this.posterConfig.error.isShow = !this.posterUploader.uploader.queue.length;

    if (eventFormStep2.invalid && this.isValidTimePicker || !this.posterUploader.uploader.queue.length) {
      const toastOptions: ToastOptions = {...customToastOptions, ...{title: 'Error', msg: 'Form is not valid'}};
      this.toastyService.error(toastOptions);
      return;
    }

    this.wowzaObj.name = this.launchEvent.name;
    this.launchEvent.timePerfomance.start = moment(this.timePerfomance.start).format('dddd, MMMM DD YYYY, h:mm:ss a');
    this.launchEvent.timePerfomance.end = moment(this.timePerfomance.end).format('dddd, MMMM DD YYYY, h:mm:ss a');

    const newStreamSubscription = this.wowzaCloudService.newStream(this.wowzaObj)
      .subscribe(liveStream => {
        this.launchEvent.wowza.id = liveStream.live_stream.id;
        this.eventServiceSubscribe = this.eventService.saveNewEvent(this.launchEvent)
          .subscribe(res => {
            const insertId = res.data.newId;
            this.posterUploader.sendFiles(insertId);
            this.router.navigate(['events']);
          }, err => {
            console.log(err);
          });
      }, err => {
        console.log('err start stream', err);
      });
  }

  setEncoder(encoder: string): void {
    this.wowzaObj.encoder = encoder;
  }

  validateTimePickers(): void {
    this.isValidTimePicker = this.timePerfomance.start.getTime() <= this.timePerfomance.end.getTime();
  }

  changeDate(date: Date): void {
    this.launchEvent.datePerformance = moment(date).format('dddd, MMMM DD YYYY');
    const startHrs = this.timePerfomance.start.getHours();
    const startMinutes = this.timePerfomance.start.getMinutes();
    const endHrs = this.timePerfomance.end.getHours();
    const endMinutes = this.timePerfomance.end.getMinutes();

    this.timePerfomance = {
      start: new Date(date.toISOString()),
      end: new Date(date.toISOString())
    };

    this.timePerfomance.start.setHours(startHrs);
    this.timePerfomance.start.setMinutes(startMinutes);
    this.timePerfomance.start.setSeconds(0);
    this.timePerfomance.end.setHours(endHrs);
    this.timePerfomance.end.setMinutes(endMinutes);
    this.timePerfomance.end.setSeconds(0);
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
