import { Component } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./styles.scss', './my-events.component.scss'],
})

export class MyEventsComponent {

  shows = [
    {
      name: 'Test show name',
      artist: 'Test Artist Name',
      creator: 'Test Creator',
      location: 'Ukraine',
      description: 'Short description of the show lorem ipsum dolor sit amet,' +
      ' consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.' +
      ' Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend',
      tickets: {
        count: 5000,
        ticketPrice: 300,
        ticketsToFund: 1500,
        ticketsSold: 0,
        fundedPercentage: 0,
      },
      timePerfomance: {
        start: 'Thursday, December 27 2017, 11:20:00 am',
        end: 'Thursday, December 27 2017, 15:00:00 pm'
      },
      poster: 'http://www.bristolmusiclive.co.uk/wp-content/uploads/2014/07/crowd.jpg',
      statistics: {
        likes: 5000,
        followers: 124
      },
      live: false,
      completed: false
    },
    {
      name: 'Test show name 2 ',
      artist: 'Test Artist Name 2 ',
      creator: 'Test Creator 2',
      location: 'Ukraine',
      description: 'Short description of the show lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. ' +
      'Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed ' +
      'eleifend',
      tickets: {
        count: 5000,
        ticketPrice: 300,
        ticketsToFund: 1500,
        ticketsSold: 0,
        fundedPercentage: 0,
      },
      timePerfomance: {
        start: 'Thursday, December 27 2017, 11:20:00 am',
        end: 'Thursday, December 27 2017, 15:00:00 pm'
      },
      poster: 'http://www.bristolmusiclive.co.uk/wp-content/uploads/2014/07/crowd.jpg',
      statistics: {
        likes: 5000,
        followers: 124
      },
      live: false,
      completed: true
    },
    {
      name: 'Test show name 3',
      artist: 'Test Artist Name 3',
      creator: 'Test Creator 3',
      location: 'Albania',
      description: 'Short description of the show lorem ipsum dolor sit amet, consectetur adipiscing' +
      ' elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo ' +
      'lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend',
      tickets: {
        count: 5000,
        ticketPrice: 300,
        ticketsToFund: 1500,
        ticketsSold: 0,
        fundedPercentage: 0,
      },
      timePerfomance: {
        start: 'Thursday, December 27 2017, 11:20:00 am',
        end: 'Thursday, December 27 2017, 15:00:00 pm'
      },
      poster: 'http://www.bristolmusiclive.co.uk/wp-content/uploads/2014/07/crowd.jpg',
      statistics: {
        likes: 5000,
        followers: 124
      },
      live: true,
      completed: false
    },
    {
      name: 'Test show name 4',
      artist: 'Test Artist Name 4',
      creator: 'Test Creator 5',
      location: 'Ukraine',
      description: 'Short description of the show lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis ' +
      'vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend',
      tickets: {
        count: 150,
        ticketPrice: 100,
        ticketsToFund: 100,
        ticketsSold: 0,
        fundedPercentage: 0,
      },
      timePerfomance: {
        start: 'Thursday, December 27 2017, 11:20:00 am',
        end: 'Thursday, December 27 2017, 15:00:00 pm'
      },
      poster: 'http://www.bristolmusiclive.co.uk/wp-content/uploads/2014/07/crowd.jpg',
      statistics: {
        likes: 300,
        followers: 10
      },
      live: true,
      completed: false
    }
  ];


}
